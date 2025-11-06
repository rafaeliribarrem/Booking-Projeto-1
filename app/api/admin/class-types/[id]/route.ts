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

    const classType = await prisma.classType.findUnique({
      where: { id: params.id },
      include: {
        sessions: {
          include: {
            instructor: true,
            bookings: {
              where: { status: "CONFIRMED" },
            },
          },
        },
      },
    });

    if (!classType) {
      return NextResponse.json(
        { error: "Class type not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(classType);
  } catch (error) {
    console.error("Failed to fetch class type:", error);
    return NextResponse.json(
      { error: "Failed to fetch class type" },
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
    const {
      name,
      description,
      durationMinutes,
      defaultCapacity,
      difficulty,
      image,
      isActive,
    } = body;

    const classType = await prisma.classType.update({
      where: { id: params.id },
      data: {
        name,
        description,
        durationMinutes,
        defaultCapacity,
        difficulty,
        image,
        isActive,
      },
    });

    return NextResponse.json(classType);
  } catch (error) {
    console.error("Failed to update class type:", error);
    return NextResponse.json(
      { error: "Failed to update class type" },
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

    // Check if class type has any sessions
    const sessionsCount = await prisma.classSession.count({
      where: { classTypeId: params.id },
    });

    if (sessionsCount > 0) {
      return NextResponse.json(
        {
          error:
            "Cannot delete class type with existing sessions. Please delete sessions first.",
        },
        { status: 400 }
      );
    }

    await prisma.classType.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete class type:", error);
    return NextResponse.json(
      { error: "Failed to delete class type" },
      { status: 500 }
    );
  }
}
