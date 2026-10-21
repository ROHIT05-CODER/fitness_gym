import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validation/contact";

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return NextResponse.json(
        { success: false, message: "Invalid Content-Type. Expected application/json." },
        { status: 415 }
      );
    }

    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { success: false, message: "Request body cannot be empty." },
        { status: 400 }
      );
    }

    const result = contactFormSchema.safeParse(body);
    if (!result.success) {
      const formattedErrors = result.error.flatten().fieldErrors;
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed. Please correct the highlighted errors.",
          errors: formattedErrors,
        },
        { status: 422 }
      );
    }

    const validatedData = result.data;

    // In production, forward to configured email provider or store in DB if approved
    // e.g. via Resend, Postmark, or Supabase
    // For now, log the validated non-sensitive fields
    console.log("[Contact Enquiry Received]", {
      name: validatedData.name,
      email: validatedData.email,
      subject: validatedData.subject,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for reaching out. A team member from Unisex Fitness will respond within 24 hours.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Contact API Error]", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred while processing your enquiry. Please try again later.",
      },
      { status: 500 }
    );
  }
}
