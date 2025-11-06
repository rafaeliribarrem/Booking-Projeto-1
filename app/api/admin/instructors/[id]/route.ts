import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const instructor = await prisma.instructor.findUnique({
      where: { id: params.id },
      include: {
        sessions: {
          include: {
            classType: true,
            bookings: {
              where: { status: "CONFIRMED" },
            },
          },
        },
      },
    });

    if (!instructor) {
      return NextResponse.json(
        { error: "Instructor not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(instructor);
  } catch (error) {
    console.error("Failed to fetch instructor:", error);
    return NextResponse.json(
      { error: "Failed to fetch instructor" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, email, phone, bio, credentials, imageUrl, isActive } = body;

    const instructor = await prisma.instructor.update({
      where: { id: params.id },
      data: {
        name,
        email,
        phone,
        bio,
        credentials,
        imageUrl,
        isActive,
      },
    });

    return NextResponse.json(instructor);
  } catch (error) {
    console.error("Failed to update instructor:", error);
    return NextResponse.json(
      { error: "Failed to update instructor" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if instructor has any sessions
    const sessionsCount = await prisma.classSession.count({
      where: { instructorId: params.id },
    });

    if (sessionsCount > 0) {
      return NextResponse.json(
        {
          error:
            "Cannot delete instructor with existing sessions. Please reassign or delete sessions first.",
        },
        { status: 400 }
      );
    }

    await prisma.instructor.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete instructor:", error);
    return NextResponse.json(
      { error: "Failed to delete instructor" },
      { status: 500 }
    );
  }
}
