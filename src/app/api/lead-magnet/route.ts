import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { sendDeliveryEmail } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const { email, childAge } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email address is required' }, { status: 400 });
    }

    // 1. Insert into leads table (ignore error if duplicate)
    try {
      await supabaseAdmin.from('leads').upsert(
        { email, child_age: childAge, source: 'freebie-optin' },
        { onConflict: 'email' }
      );
    } catch (e) {
      console.warn('Could not save lead in Supabase:', e);
    }

    // 2. Generate download link
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const downloadUrl = `${appUrl}/api/download/sample-freebie-starter-pack`;

    // 3. Send freebie email if configured
    await sendDeliveryEmail({
      to: email,
      customerName: 'Awesome Parent',
      productTitle: 'Free 5-Page Starter Activity Pack',
      downloadUrl,
    });

    return NextResponse.json({
      success: true,
      downloadUrl,
      message: 'Free sample sent! Check your email or download now.',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
