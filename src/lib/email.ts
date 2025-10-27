import { redirect } from 'next/navigation';
import nodemailer from 'nodemailer';

export async function sendEmail({ to, subject, text }: { to: string; subject: string; text: string }) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    auth: {
      user: 'apikey',
      pass: process.env.SENDGRID_API_KEY,
    },
  });

  const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
    <body style="margin:0;padding:0;font-family:Arial,sans-serif;background-color:#f4f4f4;">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:600px;margin:0 auto;background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 5px rgba(0,0,0,0.1);">
        <tr><td align="center" style="padding:20px;background-color:#007bff;color:#ffffff;"><h1 style="margin:0;font-size:24px;">Your App</h1></td></tr>
        <tr><td style="padding:20px;"><p style="font-size:16px;color:#333;line-height:1.5;">${text}</p>
          <table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td align="center" style="padding:20px 0;">
            <a href="${text.match(/https?:\/\/[^\s]+/)?.[0] || '#'}" style="display:inline-block;padding:12px 25px;background-color:#007bff;color:#ffffff;text-decoration:none;border-radius:5px;font-size:16px;">Verify Email</a>
          </td></tr></table>
          <p style="font-size:12px;color:#777;text-align:center;">Ignore if not requested.</p></td></tr>
        <tr><td align="center" style="padding:10px;background-color:#f4f4f4;color:#777;font-size:12px;">&copy; 2025 Your App</td></tr>
      </table>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: 'kiakaro69@gmail.com', // Using your Gmail for now
      to,
      subject,
      text,
      html: htmlTemplate,
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error('Email send error:', error);
    throw error;
  }
}