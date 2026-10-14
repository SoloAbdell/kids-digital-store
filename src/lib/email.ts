import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
export const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function sendDeliveryEmail({
  to,
  customerName,
  productTitle,
  downloadUrl,
}: {
  to: string;
  customerName: string;
  productTitle: string;
  downloadUrl: string;
}) {
  if (!resend) {
    console.log(`[Email Simulation] Would send to: ${to} for product: ${productTitle} with link: ${downloadUrl}`);
    return { success: true, simulated: true };
  }

  return await resend.emails.send({
    from: process.env.FROM_EMAIL || 'Tagline <downloads@taglinestore.com>',
    to,
    subject: `✨ Your Digital Download is Ready: ${productTitle}`,
    html: `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #fef08a; border-radius: 16px; background-color: #ffffff;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="color: #d97706; margin: 0; font-size: 26px;">🌟 Tagline</h1>
          <p style="color: #64748b; font-size: 14px; margin-top: 4px;">Your Cozy Hub for Digital Crafts, Stories & Learning</p>
        </div>

        <p style="font-size: 16px; color: #1e293b;">Hi <strong>${customerName}</strong>,</p>
        <p style="font-size: 16px; color: #475569; line-height: 1.6;">
          Thank you for your order! Your digital files for <strong>${productTitle}</strong> are ready for instant download.
        </p>

        <div style="text-align: center; margin: 32px 0;">
          <a href="${downloadUrl}" style="background-color: #3b82f6; color: #ffffff; padding: 14px 28px; text-decoration: none; font-weight: bold; font-size: 16px; border-radius: 30px; display: inline-block; box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.4);">
            📥 Download Your Activity Pack (PDF)
          </a>
        </div>

        <div style="background-color: #f8fafc; border-left: 4px solid #3b82f6; padding: 12px 16px; border-radius: 4px; margin-bottom: 24px;">
          <p style="margin: 0; font-size: 13px; color: #64748b;">
            💡 <strong>Printing Tip:</strong> Print on standard A4 or US Letter paper. For coloring books, regular 80gsm paper works great. For cut-and-paste crafts, slightly thicker cardstock (120-160gsm) works best!
          </p>
        </div>

        <p style="font-size: 12px; color: #94a3b8; text-align: center; margin-top: 32px;">
          Note: This secure link allows up to 5 downloads and remains active for 48 hours.<br/>
          If you need help or have any questions, simply reply to this email!
        </p>
      </div>
    `,
  });
}
