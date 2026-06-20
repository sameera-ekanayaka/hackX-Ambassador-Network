import { NextRequest, NextResponse } from 'next/server';
import { verifyHmac } from '@/utils/security';
import { createAdminClient } from '@/utils/supabase/admin';

export async function POST(request: NextRequest) {
  try {
    // 1. Read the raw request body as text and trim trailing newlines
    // This protects against tools like Postman or cURL that invisibly append \r\n
    const rawBody = (await request.text()).trim();
    
    // 2. Read headers
    const signature = request.headers.get('x-signature');
    const timestamp = request.headers.get('x-timestamp');

    // 3. Verify Signature
    const verification = verifyHmac(signature, timestamp, rawBody);
    
    if (!verification.isValid) {
      return NextResponse.json(
        { error: 'Unauthorized', ...(process.env.NODE_ENV === 'development' && { details: verification.error }) },
        { status: 401 }
      );
    }

    // 4. Validate JSON before processing
    let body;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }

    // 5. Validate Required Fields
    const { eventId, referralCode, teamId } = body;
    if (!eventId || !referralCode || !teamId) {
      return NextResponse.json(
        { error: 'Missing required fields (eventId, referralCode, teamId)' },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // 6. Idempotency Check & Transaction Processing via RPC
    const { data, error } = await supabase.rpc('process_referral_event', {
      p_event_id: eventId,
      p_referral_code: referralCode,
      p_team_id: teamId,
      p_points: 10
    });

    if (error) {
      console.error('Supabase RPC Error:', error);
      return NextResponse.json({ error: 'Database processing error' }, { status: 500 });
    }

    if (data && data.duplicate) {
      return NextResponse.json({ success: true, duplicate: true, message: 'Event already processed.' });
    }

    if (data && data.invalid_code) {
      return NextResponse.json({ success: false, error: 'Invalid referral code.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Points awarded successfully.' });

  } catch (error) {
    console.error('Error processing referral request:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
