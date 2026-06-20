'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { createAdminClient } from '@/utils/supabase/admin'

export async function adminLogin(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // 1. Authenticate user credentials
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (authError || !authData.user) {
    return redirect('/adminLogin?message=Invalid admin email or password')
  }

  // 2. Query user role using the admin client to bypass RLS
  const supabaseAdmin = createAdminClient()
  const { data: userData, error: roleError } = await supabaseAdmin
    .from('users')
    .select('role')
    .eq('user_id', authData.user.id)
    .single()

  const role = userData?.role

  // 3. Enforce that only 'admin' role is permitted to log in
  if (roleError || role !== 'admin') {
    // Immediately terminate the session if not an admin
    await supabase.auth.signOut()
    return redirect('/adminLogin?message=Unauthorized. This portal is for administrators only.')
  }

  // 4. Successful login
  revalidatePath('/', 'layout')
  return redirect('/admin')
}
