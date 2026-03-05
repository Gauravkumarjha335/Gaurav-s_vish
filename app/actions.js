"use server";

import nodemailer from "nodemailer";

export async function sendEmail(reply) {
  try {
    if (!reply || !reply.trim()) {
      return { success: false, error: "Reply message is required" };
    }

    // Create a transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "gauravkumarjha647@gmail.com",
      subject: "💍 She Said YES! - Her Reply 💗",
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px; background: linear-gradient(135deg, #fff5f7, #ffe0e6); border-radius: 20px;">
          <h1 style="color: #c94466; text-align: center; font-size: 28px; margin-bottom: 20px;">
            💍 She Said YES! 💍
          </h1>
          <div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 4px 20px rgba(200,60,100,0.15);">
            <p style="color: #666; font-size: 14px; margin-bottom: 10px; font-style: italic;">
              ✨ Her words for this moment:
            </p>
            <p style="color: #333; font-size: 18px; line-height: 1.8; font-style: italic;">
              "${reply}"
            </p>
          </div>
          <p style="text-align: center; color: #c94466; margin-top: 30px; font-size: 24px;">
            💗🌹💖
          </p>
          <p style="text-align: center; color: #999; font-size: 12px; margin-top: 20px;">
            Sent from your Proposal App
          </p>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return { success: true, message: "Reply sent successfully!" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: "Failed to send email. Please try again." };
  }
}
