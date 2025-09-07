import { NextRequest, NextResponse } from "next/server";
import { sendContactEmails } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    // Check if at least one email service is configured
    if (!process.env.SENDGRID_API_KEY && !process.env.SMTP_HOST) {
      console.error(
        "No email service is configured (neither SendGrid nor SMTP)"
      );
      return NextResponse.json(
        { error: "Email service is not configured" },
        { status: 500 }
      );
    }

    if (!process.env.FROM_EMAIL) {
      console.error("FROM_EMAIL is not configured");
      return NextResponse.json(
        { error: "Email service is not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { name, email, subject, message } = body;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    // Send emails using the multi-provider service
    const result = await sendContactEmails({ name, email, subject, message });

    if (result.success) {
      console.log(`Contact form email sent successfully via ${result.method}`);
      return NextResponse.json(
        { message: `Message sent successfully via ${result.method}!` },
        { status: 200 }
      );
    } else {
      console.error("All email methods failed:", result.error);

      // Log the contact attempt for manual follow-up
      console.log("CONTACT FORM SUBMISSION (All email services failed):", {
        name,
        email,
        subject,
        message,
        timestamp: new Date().toISOString(),
      });

      return NextResponse.json(
        {
          error:
            "Email services temporarily unavailable. Your message has been logged and I'll respond directly via email. You can also reach me at johndoe@example.com or LinkedIn.",
          fallback: true,
        },
        { status: 202 } // 202 = Accepted but not fully processed
      );
    }
  } catch (error) {
    console.error("Unexpected contact form error:", error);

    // Log the contact attempt for manual follow-up
    console.log("CONTACT FORM SUBMISSION (Unexpected error):", {
      name: request.body ? JSON.parse(await request.text()).name : "Unknown",
      email: request.body ? JSON.parse(await request.text()).email : "Unknown",
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        error:
          "Something went wrong. Please try again or contact me directly at johndoe@example.com",
      },
      { status: 500 }
    );
  }
}
