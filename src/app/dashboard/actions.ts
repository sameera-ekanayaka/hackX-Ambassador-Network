'use server'

import { createClient } from '@/utils/supabase/server'
import { createAdminClient } from '@/utils/supabase/admin'
import { revalidatePath } from 'next/cache'

// Get current ambassador profile
export async function getAmbassadorProfile() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) throw new Error('Not authenticated')

  const supabaseAdmin = createAdminClient()
  const { data, error } = await supabaseAdmin
    .from('ambassador')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (error) throw error
  return data
}

// Get event submissions
export async function getSubmissions(ambassadorId: string) {
  const supabaseAdmin = createAdminClient()
  const { data, error } = await supabaseAdmin
    .from('activity_submission')
    .select(`
      *,
      file_upload ( file_url )
    `)
    .eq('ambassador_id', ambassadorId)
    .order('submitted_at', { ascending: false })

  if (error) throw error
  return data
}

// Get referral stats (total points and referred teams)
export async function getReferralStats(ambassadorId: string) {
  const supabaseAdmin = createAdminClient()
  
  // 1. Get total points
  const { data: pointsData } = await supabaseAdmin
    .from('ambassador_points')
    .select('total_points')
    .eq('ambassador_id', ambassadorId)
    .single()
    
  // 2. Get referred teams from point_transaction descriptions
  const { data: teamsData } = await supabaseAdmin
    .from('point_transaction')
    .select('description, created_at')
    .eq('ambassador_id', ambassadorId)
    .eq('activity_type', 'team_referral')
    .order('created_at', { ascending: false })

  // Extract team ID from the description: "Awarded points for team registration (Team ID: XYZ)"
  const referredTeams = (teamsData || []).map(t => {
    const match = t.description?.match(/Team ID: (.+)\)$/)
    return match ? match[1] : 'Unknown Team'
  })

  return {
    totalPoints: pointsData?.total_points || 0,
    referredTeams
  }
}

// Submit a new activity/event
export async function submitActivity(formData: FormData) {
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const activityType = formData.get('activityType') as string
  const googleDriveLink = formData.get('googleDriveLink') as string

  if (!title || !title.trim() || !description || !description.trim() || !activityType || !activityType.trim() || !googleDriveLink || !googleDriveLink.trim()) {
    throw new Error('All fields are required.')
  }

  const profile = await getAmbassadorProfile()
  if (!profile) throw new Error('Could not find ambassador profile')

  const supabaseAdmin = createAdminClient()

  // 1. Insert activity_submission
  const { data: submission, error: subError } = await supabaseAdmin
    .from('activity_submission')
    .insert([{
      ambassador_id: profile.ambassador_id,
      title,
      description,
      activity_type: activityType,
      status: 'pending'
    }])
    .select('submission_id')
    .single()

  if (subError) {
    console.error('Error submitting activity:', subError)
    throw new Error('Failed to submit activity.')
  }

  // 2. Insert Google Drive Link into file_upload table
  if (googleDriveLink && googleDriveLink.trim() !== '') {
    const { error: fileError } = await supabaseAdmin
      .from('file_upload')
      .insert([{
        submission_id: submission.submission_id,
        file_name: 'Google Drive Link',
        file_url: googleDriveLink,
        file_type: 'link'
      }])

    if (fileError) {
      console.error('Error attaching link:', fileError)
      // Optional: Maybe delete the submission if link fails, but usually we just log it
    }
  }

  revalidatePath('/dashboard')
  return { success: true }
}
