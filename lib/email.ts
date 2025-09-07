import sgMail from "@sendgrid/mail";

export interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface EmailContent {
  to: string;
  from: string | { email: string; name: string };
  replyTo?: string;
  subject: string;
  html: string;
  text: string;
}

// Configure SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

// Create nodemailer transporter
const createNodemailerTransporter = async () => {
  if (
    !process.env.SMTP_HOST ||
    !process.env.SMTP_USER ||
    !process.env.SMTP_PASS
  ) {
    console.log("SMTP config missing:", {
      host: !!process.env.SMTP_HOST,
      user: !!process.env.SMTP_USER,
      pass: !!process.env.SMTP_PASS,
    });
    return null;
  }

  console.log("Creating SMTP transporter with:", {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || "587",
    secure: process.env.SMTP_SECURE === "true",
    user: process.env.SMTP_USER,
  });

  try {
    // Dynamic import to fix Turbopack issue
    const { createTransport } = await import("nodemailer");

    return createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  } catch (error) {
    console.error("Failed to import nodemailer:", error);
    return null;
  }
};

export const generateEmailContent = (
  data: EmailData,
  isForSender = false
): EmailContent => {
  const { name, email, subject, message } = data;

  if (isForSender) {
    // Confirmation email for sender
    return {
      to: email,
      from: {
        email: process.env.FROM_EMAIL!,
        name: process.env.FROM_EMAIL_NAME || "John Doe",
      },
      subject: `Thank you for contacting me - Re: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #10b981; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
              .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
              .field { margin-bottom: 20px; }
              .label { font-weight: bold; color: #374151; display: block; margin-bottom: 5px; }
              .value { background: white; padding: 15px; border-radius: 6px; border-left: 4px solid #10b981; }
              .message-content { white-space: pre-wrap; }
              .signature { margin-top: 20px; padding: 15px; background: white; border-radius: 6px; }
              .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #6b7280; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2 style="margin: 0;">Thank you for reaching out!</h2>
              </div>
              <div class="content">
                <p>Hi ${name},</p>
                
                <p>Thank you for contacting me through my website. I've received your message and I'll get back to you as soon as possible, typically within 24-48 hours.</p>
                
                <h3 style="color: #374151; margin-top: 25px;">Your message details:</h3>
                
                <div class="field">
                  <span class="label">Subject:</span>
                  <div class="value">${subject}</div>
                </div>
                
                <div class="field">
                  <span class="label">Your Message:</span>
                  <div class="value message-content">${message}</div>
                </div>
                
                <p>If you need to reach me urgently, you can also connect with me on <a href="${process.env.LINKEDIN_URL}" style="color: #3b82f6;">LinkedIn</a>.</p>
                
                <div class="signature">
                  <p><strong>Best regards,</strong><br>
                  ${process.env.FROM_EMAIL_NAME}<br>
                  ${process.env.TITLE}<br>
                  <a href="mailto:${process.env.FROM_EMAIL}" style="color: #3b82f6;">${process.env.FROM_EMAIL}</a></p>
                </div>
                
                <div class="footer">
                  <p>This is an automated confirmation email.</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
Hi ${name},

Thank you for contacting me through my website. I've received your message and I'll get back to you as soon as possible, typically within 24-48 hours.

Your message details:
Subject: ${subject}
Message: ${message}

If you need to reach me urgently, you can also connect with me on LinkedIn: ${process.env.LINKEDIN_URL}

Best regards,
${process.env.FROM_EMAIL_NAME}
${process.env.TITLE}
${process.env.FROM_EMAIL}
      `,
    };
  } else {
    // Notification email for you
    return {
      to: process.env.TO_EMAIL || process.env.FROM_EMAIL!,
      from: {
        email: process.env.FROM_EMAIL!,
        name: process.env.FROM_EMAIL_NAME || "John Doe - Contact Form",
      },
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #3b82f6; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
              .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
              .field { margin-bottom: 20px; }
              .label { font-weight: bold; color: #374151; display: block; margin-bottom: 5px; }
              .value { background: white; padding: 15px; border-radius: 6px; border-left: 4px solid #3b82f6; }
              .message-content { white-space: pre-wrap; }
              .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #6b7280; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2 style="margin: 0;">New Contact Form Message</h2>
              </div>
              <div class="content">
                <div class="field">
                  <span class="label">From:</span>
                  <div class="value">${name}</div>
                </div>
                
                <div class="field">
                  <span class="label">Email:</span>
                  <div class="value">${email}</div>
                </div>
                
                <div class="field">
                  <span class="label">Subject:</span>
                  <div class="value">${subject}</div>
                </div>
                
                <div class="field">
                  <span class="label">Message:</span>
                  <div class="value message-content">${message}</div>
                </div>
                
                <div class="footer">
                  <p>This message was sent from your personal blog contact form.</p>
                  <p>Reply directly to this email to respond to ${name} at ${email}</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
New Contact Form Message

From: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
This message was sent from your personal blog contact form.
Reply directly to this email to respond to ${name} at ${email}
      `,
    };
  }
};

export async function sendEmailViaSendGrid(
  emailContent: EmailContent[]
): Promise<void> {
  if (!process.env.SENDGRID_API_KEY) {
    throw new Error("SendGrid API key not configured");
  }

  await sgMail.send(emailContent);
}

export async function sendEmailViaNodemailer(
  emailContent: EmailContent[]
): Promise<void> {
  const transporter = await createNodemailerTransporter();

  if (!transporter) {
    throw new Error("SMTP configuration not available");
  }

  for (const email of emailContent) {
    await transporter.sendMail({
      from:
        typeof email.from === "string"
          ? email.from
          : `"${email.from.name}" <${email.from.email}>`,
      to: email.to,
      replyTo: email.replyTo,
      subject: email.subject,
      html: email.html,
      text: email.text,
    });
  }
}

export async function sendContactEmails(
  data: EmailData
): Promise<{ success: boolean; method: string; error?: string }> {
  const emailToYou = generateEmailContent(data, false);
  const emailToSender = generateEmailContent(data, true);
  const emails = [emailToYou, emailToSender];

  // Try SendGrid first
  if (process.env.SENDGRID_API_KEY) {
    try {
      await sendEmailViaSendGrid(emails);
      return { success: true, method: "SendGrid" };
    } catch (error: any) {
      console.error("SendGrid failed:", error);

      // Log detailed SendGrid error
      if (error.response?.body) {
        console.error(
          "SendGrid error details:",
          JSON.stringify(error.response.body, null, 2)
        );
      }

      // Check if it's a credits issue or auth issue
      if (error.code === 401) {
        const errorMessage = error.response?.body?.errors?.[0]?.message || "";
        if (errorMessage.toLowerCase().includes("credits")) {
          console.log("SendGrid credits exceeded, trying fallback...");
        } else {
          console.log(
            "SendGrid auth failed (check API key), trying fallback..."
          );
        }
      }
    }
  } else {
    console.log("No SendGrid API key configured");
  }

  // Try Nodemailer fallback
  if (process.env.SMTP_HOST) {
    try {
      await sendEmailViaNodemailer(emails);
      return { success: true, method: "SMTP" };
    } catch (error: any) {
      console.error("SMTP fallback failed:", error);
      return { success: false, method: "none", error: error.message };
    }
  }

  return {
    success: false,
    method: "none",
    error: "No email service configured",
  };
}
