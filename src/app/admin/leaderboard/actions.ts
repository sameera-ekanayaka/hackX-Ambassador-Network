'use server'

import { createAdminClient } from '@/utils/supabase/admin'

export async function getLeaderboardData() {
  const supabase = createAdminClient()
  
  // 1. Fetch approved ambassadors
  const { data: ambassadors, error: ambError } = await supabase
    .from('ambassador')
    .select(`
      ambassador_id,
      full_name,
      university ( university_name )
    `)
    .eq('status', 'approved')

  if (ambError) throw ambError

  // 2. Fetch points view
  const { data: pointsData, error: pointsError } = await supabase
    .from('ambassador_points')
    .select('*')

  if (pointsError) throw pointsError

  // 3. Merge and sort
  const pointsMap = new Map(pointsData.map((p: any) => [p.ambassador_id, p.total_points]))

  const leaderboard = ambassadors.map((amb: any) => ({
    ...amb,
    total_points: pointsMap.get(amb.ambassador_id) || 0
  }))

  // Sort descending by points
  leaderboard.sort((a, b) => b.total_points - a.total_points)

  return leaderboard
}
