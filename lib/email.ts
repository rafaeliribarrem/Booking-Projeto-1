export async function sendBookingConfirmation(to: string, details: { className: string; startsAt: Date }) {
  if (!process.env.RESEND_API_KEY) return; // no-op in dev
  try {
    // @ts-ignore - Resend is optional dependency
    const { Resend } = await import("resend");
    // @ts-ignore
    const resend = new Resend(process.env.RESEND_API_KEY);
    // @ts-ignore
    await resend.emails.send({
      from: "Serenity Yoga <bookings@serenityyoga.example>",
      to,
      subject: `Booking confirmed: ${details.className}`,
      text: `You're booked for ${details.className} on ${details.startsAt.toLocaleString()}.`,
    });
  } catch (error) {
    // Resend not installed or error sending email - silently fail
    console.error("Failed to send email:", error);
  }
}


