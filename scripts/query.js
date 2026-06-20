const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

// Read environment variables
const envContent = fs.readFileSync('../.env.local', 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    const key = parts[0].trim();
    const val = parts.slice(1).join('=').trim();
    env[key] = val;
  }
});

// Initialize client with secret service role key (bypasses RLS)
const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY
);

async function testConnection() {
  console.log('Testing connection to Supabase:', env.NEXT_PUBLIC_SUPABASE_URL);
  
  try {
    const { data: users, error: usersError } = await supabase.from('users').select('*');
    if (usersError) {
      console.error('Error fetching users table:', usersError);
      return;
    }
    
    console.log('Connection successful! Connected to:', env.NEXT_PUBLIC_SUPABASE_URL);
    console.log('Current table row count summaries:');
    console.log(`- users table: ${users.length} rows`);

    const { data: ambassadors } = await supabase.from('ambassador').select('*');
    console.log(`- ambassador table: ${ambassadors?.length || 0} rows`);

    const { data: admins } = await supabase.from('admin').select('*');
    console.log(`- admin table: ${admins?.length || 0} rows`);
  } catch (err) {
    console.error('Fatal connection error:', err);
  }

  const { data: universities } = await supabase.from('university').select('*');
  console.log(`- university table: ${universities?.length || 0} rows`);
  
  const { data: faculties } = await supabase.from('faculty').select('*');
  console.log(`- faculty table: ${faculties?.length || 0} rows`);
  
  const { data: degrees } = await supabase.from('degree_programme').select('*');
  console.log(`- degree_programme table: ${degrees?.length || 0} rows`);
}

testConnection();
