import crypto from 'crypto';

export interface VerifyHmacResult {
  isValid: boolean;
  error?: string;
}

/**
 * Verifies an HMAC-SHA256 signature from an incoming request.
 * 
 * @param signature - The signature from the 'X-Signature' header
 * @param timestamp - The timestamp from the 'X-Timestamp' header (in milliseconds)
 * @param rawBody - The raw text body of the incoming request
 * @returns Object indicating if the signature is valid and any error message
 */
export function verifyHmac(
  signature: string | null,
  timestamp: string | null,
  rawBody: string
): VerifyHmacResult {
  // 1. Check if headers exist
  if (!signature || !timestamp) {
    return { isValid: false, error: 'Missing required signature headers.' };
  }

  // 2. Safely handle malformed signatures before buffer creation
  if (!/^[a-f0-9]{64}$/i.test(signature)) {
    return { isValid: false, error: 'Invalid signature format.' };
  }

  const timestampMs = parseInt(timestamp, 10);
  if (isNaN(timestampMs)) {
    return { isValid: false, error: 'Invalid timestamp format.' };
  }

  const currentTimeMs = Date.now();

  // 3a. Reject requests older than 5 minutes (300,000 ms)
  const FIVE_MINUTES_MS = 5 * 60 * 1000;
  if (currentTimeMs - timestampMs > FIVE_MINUTES_MS) {
    return { isValid: false, error: 'Request timestamp is too old.' };
  }

  // 3b. Reject requests from the future (allow 30 seconds of clock drift)
  if (timestampMs > currentTimeMs + 30000) {
    return { isValid: false, error: 'Request timestamp is from the future.' };
  }

  // 4. Retrieve the shared secret
  const secret = process.env.AMS_REFERRAL_HMAC_SECRET;
  if (!secret) {
    console.error('AMS_REFERRAL_HMAC_SECRET is not configured in the environment.');
    return { isValid: false, error: 'Server configuration error.' };
  }

  // 5. Recalculate the expected signature
  const payload = timestamp + rawBody;
  
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload, 'utf8')
    .digest('hex');

  console.log('--- HMAC DEBUG ---');
  console.log('Raw Payload received (escaped):', JSON.stringify(payload));
  console.log('Raw Body length:', rawBody.length);
  console.log('Expected Signature:', expectedSignature);
  console.log('Actual Signature:', signature);
  console.log('------------------');

  // 6. Compare signatures using timingSafeEqual to prevent timing attacks
  const expectedBuffer = Buffer.from(expectedSignature, 'hex');
  const actualBuffer = Buffer.from(signature, 'hex');

  if (expectedBuffer.length !== actualBuffer.length) {
    return { isValid: false, error: 'Invalid signature length.' };
  }

  const isMatch = crypto.timingSafeEqual(expectedBuffer, actualBuffer);

  if (!isMatch) {
    return { isValid: false, error: 'Invalid signature.' };
  }

  return { isValid: true };
}
