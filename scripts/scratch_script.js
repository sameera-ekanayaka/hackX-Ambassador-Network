const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function run() {
  const { data: ambassadors, error } = await supabase
    .from('ambassador')
    .select('ambassador_id, full_name, ambassador_code')
    .eq('status', 'approved')

  if (error) {
    console.error('Error fetching ambassadors:', error)
    return
  }

  for (const amb of ambassadors) {
    if (!amb.ambassador_code) {
      const namePrefix = amb.full_name 
        ? amb.full_name.replace(/[^a-zA-Z]/g, '').substring(0, 3).toUpperCase() 
        : 'AMB'
      const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase()
      const referralCode = `HX-${namePrefix}-${randomChars}`

      const { error: updateError } = await supabase
        .from('ambassador')
        .update({ ambassador_code: referralCode })
        .eq('ambassador_id', amb.ambassador_id)

      if (updateError) {
        console.error(`Error updating ambassador ${amb.ambassador_id}:`, updateError)
      } else {
        console.log(`Updated ${amb.full_name} with code ${referralCode}`)
      }
    } else {
      console.log(`${amb.full_name} already has a code: ${amb.ambassador_code}`)
    }
  }
}

run()
