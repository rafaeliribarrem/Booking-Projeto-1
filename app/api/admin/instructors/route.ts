import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const instructors = await prisma.instructor.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(instructors);
  } catch (error) {
    console.error("Failed to fetch instructors:", error);
    return NextResponse.json(
      { error: "Failed to fetch instructors" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, email, phone, bio, credentials, imageUrl, isActive } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    const instructor = await prisma.instructor.create({
      data: {
        name,
        email,
        phone,
        bio,
        credentials,
        imageUrl,
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json(instructor, { status: 201 });
  } catch (error) {
    console.error("Failed to create instructor:", error);
    return NextResponse.json(
      { error: "Failed to create instructor" },
      { status: 500 }
    );
  }
}
