'use server'

import { createAdminClient } from '@/utils/supabase/admin'
import { revalidatePath } from 'next/cache'

// Fetch all pending requests with their temp clubs
export async function getPendingRequests() {
  const supabase = createAdminClient()
  
  const { data: ambassadors, error: ambError } = await supabase
    .from('ambassador')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: false })

  if (ambError) throw ambError

  const { data: clubs, error: clubError } = await supabase
    .from('club_temp')
    .select('*')
    .eq('status', 'pending')

  if (clubError) throw clubError

  // Attach clubs to each ambassador
  const requests = ambassadors.map((amb) => ({
    ...amb,
    temp_clubs: clubs.filter(c => c.ambassador_id === amb.ambassador_id)
  }))

  return requests
}

export async function getRegisteredAmbassadors() {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('ambassador')
    .select(`
      *,
      university ( university_name ),
      faculty ( faculty_name ),
      degree_programme ( programme_name )
    `)
    .eq('status', 'approved')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

// Fetch metadata for comboboxes
export async function getMetadata() {
  const supabase = createAdminClient()
  
  const [univs, facs, degrees, clubs] = await Promise.all([
    supabase.from('university').select('*').order('university_name'),
    supabase.from('faculty').select('*').order('faculty_name'),
    supabase.from('degree_programme').select('*').order('programme_name'),
    supabase.from('club').select('*').order('club_name')
  ])

  if (univs.error) throw univs.error
  if (facs.error) throw facs.error
  if (degrees.error) throw degrees.error
  if (clubs.error) throw clubs.error

  return {
    universities: univs.data,
    faculties: facs.data,
    degreeProgrammes: degrees.data,
    clubs: clubs.data
  }
}

export type AcceptPayload = {
  university: { id?: string, name: string },
  faculty: { id?: string, name: string },
  degreeProgramme: { id?: string, name: string },
  clubs: Array<{ id?: string, name: string, tempId: string }>
}

export async function acceptAmbassador(ambassadorId: string, payload: AcceptPayload) {
  const supabase = createAdminClient()
  
  let universityId = payload.university.id
  let facultyId = payload.faculty.id
  let degreeProgrammeId = payload.degreeProgramme.id

  // 1. Create University if it doesn't exist
  if (!universityId) {
    const { data, error } = await supabase
      .from('university')
      .insert([{ university_name: payload.university.name }])
      .select('university_id')
      .single()
    if (error) throw error
    universityId = data.university_id
  }

  // 2. Create Faculty if it doesn't exist
  if (!facultyId) {
    const { data, error } = await supabase
      .from('faculty')
      .insert([{ faculty_name: payload.faculty.name, university_id: universityId }])
      .select('faculty_id')
      .single()
    if (error) throw error
    facultyId = data.faculty_id
  }

  // 3. Create Degree Programme if it doesn't exist
  if (!degreeProgrammeId) {
    const { data, error } = await supabase
      .from('degree_programme')
      .insert([{ programme_name: payload.degreeProgramme.name, faculty_id: facultyId }])
      .select('degree_programme_id')
      .single()
    if (error) throw error
    degreeProgrammeId = data.degree_programme_id
  }

  // 4. Handle Clubs
  const officialClubIds = []
  for (const c of payload.clubs) {
    let clubId = c.id
    if (!clubId) {
      const { data, error } = await supabase
        .from('club')
        .insert([{ club_name: c.name }])
        .select('club_id')
        .single()
      if (error) throw error
      clubId = data.club_id
    }
    officialClubIds.push(clubId)
    
    // Update temp club status
    await supabase
      .from('club_temp')
      .update({ status: 'approved' })
      .eq('temp_club_id', c.tempId)
  }

  // 5. Update Ambassador
  // Fetch ambassador to get name for code generation
  const { data: ambData } = await supabase
    .from('ambassador')
    .select('full_name')
    .eq('ambassador_id', ambassadorId)
    .single()

  const namePrefix = ambData?.full_name 
    ? ambData.full_name.replace(/[^a-zA-Z]/g, '').substring(0, 3).toUpperCase() 
    : 'AMB'
  const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase()
  const referralCode = `HX-${namePrefix}-${randomChars}`

  const { error: updateError } = await supabase
    .from('ambassador')
    .update({
      university_id: universityId,
      faculty_id: facultyId,
      degree_programme_id: degreeProgrammeId,
      status: 'approved',
      ambassador_code: referralCode
    })
    .eq('ambassador_id', ambassadorId)

  if (updateError) throw updateError

  // 6. Insert Ambassador Clubs
  if (officialClubIds.length > 0) {
    const clubInserts = officialClubIds.map(cid => ({
      ambassador_id: ambassadorId,
      club_id: cid
    }))
    
    const { error: acError } = await supabase
      .from('ambassador_club')
      .insert(clubInserts)
      
    // Ignore duplicate key errors if they somehow already have it mapped
    if (acError && acError.code !== '23505') throw acError
  }

  revalidatePath('/admin/ambassadors')
  return { success: true }
}

export async function rejectAmbassador(ambassadorId: string, reason: string) {
  const supabase = createAdminClient()
  
  const { error } = await supabase
    .from('ambassador')
    .update({
      status: 'rejected',
      rejection_reason: reason
    })
    .eq('ambassador_id', ambassadorId)

  if (error) throw error
  
  // Update associated temp clubs to rejected as well
  await supabase
    .from('club_temp')
    .update({ status: 'rejected' })
    .eq('ambassador_id', ambassadorId)
    .eq('status', 'pending')

  revalidatePath('/admin/ambassadors')
  return { success: true }
}
