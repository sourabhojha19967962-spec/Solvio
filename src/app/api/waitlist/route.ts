import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export async function POST(request: NextRequest) {
  try {
    const { email, company } = await request.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check for duplicate
    const exists = await kv.sismember('waitlist:emails', cleanEmail);
    if (exists) {
      return NextResponse.json(
        { error: 'This email is already on the waitlist!' },
        { status: 409 }
      );
    }

    // Add to set (for duplicate checking)
    await kv.sadd('waitlist:emails', cleanEmail);

    // Store full entry
    await kv.lpush('waitlist:entries', JSON.stringify({
      email: cleanEmail,
      company: (company || '').trim(),
      timestamp: new Date().toISOString(),
    }));

    // Get count
    const count = await kv.scard('waitlist:emails');

    return NextResponse.json({
      success: true,
      position: count,
      message: `You're #${count} on the waitlist!`,
    });
  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const count = await kv.scard('waitlist:emails');
    const rawEntries = await kv.lrange('waitlist:entries', 0, -1);

    const entries = rawEntries
      .map((e: string) => {
        try { return JSON.parse(e); } catch { return null; }
      })
      .filter(Boolean);

    return NextResponse.json({
      count,
      entries,
    });
  } catch (error) {
    console.error('Waitlist GET error:', error);
    return NextResponse.json(
      { error: 'Could not fetch waitlist' },
      { status: 500 }
    );
  }
}
