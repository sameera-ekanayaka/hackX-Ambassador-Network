'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { createAdminClient } from '@/utils/supabase/admin'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // 1. Authenticate user credentials
  console.time('auth')
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  console.timeEnd('auth')

  if (authError || !authData.user) {
    return redirect('/login?message=Invalid email or password')
  }

  // 2. Check the ambassador application status using the admin client
  const supabaseAdmin = createAdminClient()

  console.time('profile')
  const { data: ambassadorData, error: ambError } = await supabaseAdmin
    .from('ambassador')
    .select('status, rejection_reason')
    .eq('user_id', authData.user.id)
    .single()
  console.timeEnd('profile')

  if (ambError || !ambassadorData) {
    await supabase.auth.signOut()
    return redirect('/login?message=Could not find your ambassador application.')
  }

  if (ambassadorData.status === 'pending') {
    await supabase.auth.signOut()
    return redirect('/login?message=Your application is still pending review by an admin.')
  }

  if (ambassadorData.status === 'rejected') {
    await supabase.auth.signOut()
    return redirect('/login?message=' + encodeURIComponent(`Your application was rejected. Reason: ${ambassadorData.rejection_reason || 'No reason provided'}`))
  }

  if (ambassadorData.status === 'suspended') {
    await supabase.auth.signOut()
    return redirect('/login?message=Your account has been suspended. Please contact support.')
  }

  // 4. Successful login
  revalidatePath('/', 'layout')
  return redirect('/dashboard')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  return redirect('/login')
}

export async function adminSignOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  return redirect('/adminLogin')
}
