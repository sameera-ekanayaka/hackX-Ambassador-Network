'use server'

import { createClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'

export async function submitApplication(formData: FormData) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const fullName = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirm_password') as string
  
  if (password !== confirmPassword) {
    return redirect(`/register?error=${encodeURIComponent("Passwords do not match")}`)
  }

  const phone = formData.get('phone') as string
  const whatsapp = formData.get('whatsapp') as string
  const yearOfStudy = parseInt(formData.get('year_of_study') as string, 10)
  
  const submittedUniversity = formData.get('university') as string
  const submittedFaculty = formData.get('faculty') as string
  const submittedDegreeProgramme = formData.get('degree_programme') as string
  const motivation = formData.get('motivation') as string

  const facebookUrl = formData.get('facebook_url') as string || null
  const linkedinUrl = formData.get('linkedin_url') as string || null
  
  // Get all clubs
  const clubs = formData.getAll('clubs')
    .map(c => c.toString().trim())
    .filter(c => c !== '')

  // 1. Create the user account in Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // Automatically confirm the email
  })

  if (authError) {
    console.error('Error creating user:', authError)
    return redirect(`/register?error=${encodeURIComponent(authError.message || 'Could not create account')}`)
  }

  const userId = authData.user.id

  // 2. Insert into the public.users table with role 'ambassador'
  const { error: userError } = await supabase
    .from('users')
    .insert([{ user_id: userId, role: 'ambassador' }])

  if (userError) {
    console.error('Error inserting into users table:', userError)
    // Clean up auth user if it fails
    await supabase.auth.admin.deleteUser(userId)
    return redirect(`/register?error=${encodeURIComponent('Could not finalize account creation')}`)
  }

  // 3. Insert Ambassador Application
  const applicationData = {
    user_id: userId,
    full_name: fullName,
    email,
    phone_number: phone,
    whatsapp_number: whatsapp,
    year_of_study: yearOfStudy,
    submitted_university: submittedUniversity,
    submitted_faculty: submittedFaculty,
    submitted_degree_programme: submittedDegreeProgramme,
    motivation: motivation,
    facebook_url: facebookUrl,
    linkedin_url: linkedinUrl,
    status: 'pending'
  }

  const { data: ambassadorData, error } = await supabase
    .from('ambassador')
    .insert([applicationData])
    .select('ambassador_id')
    .single()

  if (error) {
    console.error('Error submitting application:', error)
    return redirect(`/register?error=${encodeURIComponent(error.message || 'Could not submit application')}`)
  }

  // 4. Insert Clubs into club_temp
  if (clubs.length > 0 && ambassadorData) {
    const clubInserts = clubs.map(clubName => ({
      ambassador_id: ambassadorData.ambassador_id,
      submitted_club_name: clubName
    }))
    
    await supabase.from('club_temp').insert(clubInserts)
  }

  return redirect('/register/success')
}
