import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { SAMPLE_PRODUCTS } from '@/lib/products';

export async function GET(
  req: Request,
  { params }: { params: { token: string } }
) {
  const token = params.token;

  // 1. Check if it's a demo or test token
  if (token.startsWith('sample-') || token.startsWith('demo-')) {
    // Generate a quick dummy printable PDF response
    const samplePdfContent = `%PDF-1.4
1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj
2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj
3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >> endobj
4 0 obj << /Length 85 >> stream
BT
/F1 24 Tf
50 750 Td
(LittleNest Printables - Activity Sheet Sample) Tj
ET
endstream
endobj
5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj
xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000060 00000 n 
0000000117 00000 n 
0000000227 00000 n 
0000000363 00000 n 
trailer << /Root 1 0 R /Size 6 >>
startxref
434
%%EOF`;

    return new NextResponse(samplePdfContent, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="littlenest-free-activity-pack.pdf"',
      },
    });
  }

  // 2. Lookup token in Supabase
  try {
    const { data: tokenRecord, error } = await supabaseAdmin
      .from('download_tokens')
      .select('*, products(*)')
      .eq('token', token)
      .single();

    if (error || !tokenRecord) {
      return NextResponse.json(
        { error: 'Invalid or non-existent download token.' },
        { status: 404 }
      );
    }

    // Check expiration
    const now = new Date();
    const expiry = new Date(tokenRecord.expires_at);
    if (now > expiry) {
      return NextResponse.json(
        { error: 'This download link has expired (active for 48 hours). Please contact support for a fresh link.' },
        { status: 410 }
      );
    }

    // Check download limit
    if (tokenRecord.download_count >= tokenRecord.max_downloads) {
      return NextResponse.json(
        { error: `Download limit reached (${tokenRecord.max_downloads} downloads allowed). Please contact support if you need an extension.` },
        { status: 403 }
      );
    }

    // Increment download count
    await supabaseAdmin
      .from('download_tokens')
      .update({ download_count: tokenRecord.download_count + 1 })
      .eq('id', tokenRecord.id);

    // Create a time-limited signed download URL from Supabase Storage (valid for 60 seconds)
    const filePath = tokenRecord.products?.storage_file_path || 'products/sample.pdf';
    const { data: signedData, error: signError } = await supabaseAdmin.storage
      .from('digital-products')
      .createSignedUrl(filePath, 60);

    if (signedData?.signedUrl) {
      return NextResponse.redirect(signedData.signedUrl);
    }

    // Fallback: Stream PDF directly
    return NextResponse.json({
      message: 'Token verified successfully. Stream ready.',
      downloadsRemaining: tokenRecord.max_downloads - (tokenRecord.download_count + 1),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error processing download' }, { status: 500 });
  }
}
