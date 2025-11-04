import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { classTypeId, instructorId, startsAt, endsAt, capacity, location } = body;

    const session = await prisma.classSession.create({
      data: {
        classTypeId,
        instructorId,
        startsAt: new Date(startsAt),
        endsAt: new Date(endsAt),
        capacity,
        location,
      },
    });

    return NextResponse.json(session);
  } catch (error) {
    console.error("Failed to create session:", error);
    return NextResponse.json(
      { error: "Failed to create session" },
      { status: 500 }
    );
  }
}
