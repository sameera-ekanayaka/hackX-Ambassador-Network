'use server'

import { createAdminClient } from '@/utils/supabase/admin'
import { revalidatePath } from 'next/cache'

export async function getPendingEvents() {
  const supabase = createAdminClient()
  
  const { data, error } = await supabase
    .from('activity_submission')
    .select(`
      *,
      ambassador ( full_name, email, university ( university_name ) ),
      file_upload ( file_url )
    `)
    .eq('status', 'pending')
    .order('submitted_at', { ascending: false })

  if (error) throw error
  return data
}

export async function getApprovedEvents() {
  const supabase = createAdminClient()
  
  const { data, error } = await supabase
    .from('activity_submission')
    .select(`
      *,
      ambassador ( full_name, email, university ( university_name ) ),
      file_upload ( file_url )
    `)
    .eq('status', 'approved')
    .order('reviewed_at', { ascending: false })

  if (error) throw error
  return data
}

export async function approveEvent(submissionId: string, ambassadorId: string, points: number, activityType: string) {
  const supabase = createAdminClient()

  // 1. Update activity_submission status and points
  const { error: updateError } = await supabase
    .from('activity_submission')
    .update({ 
      status: 'approved', 
      points_awarded: points,
      reviewed_at: new Date().toISOString()
    })
    .eq('submission_id', submissionId)

  if (updateError) throw updateError

  // 2. Create point_transaction
  const { error: pointError } = await supabase
    .from('point_transaction')
    .insert([{
      ambassador_id: ambassadorId,
      submission_id: submissionId,
      activity_type: activityType,
      points: points,
      description: `Awarded points for ${activityType.replace('_', ' ')}`
    }])

  if (pointError) throw pointError

  revalidatePath('/admin/marketing')
  revalidatePath('/admin/leaderboard')
  return { success: true }
}

export async function rejectEvent(submissionId: string, reason: string) {
  const supabase = createAdminClient()

  const { error } = await supabase
    .from('activity_submission')
    .update({ 
      status: 'rejected', 
      rejection_reason: reason,
      reviewed_at: new Date().toISOString()
    })
    .eq('submission_id', submissionId)

  if (error) throw error

  revalidatePath('/admin/marketing')
  return { success: true }
}
