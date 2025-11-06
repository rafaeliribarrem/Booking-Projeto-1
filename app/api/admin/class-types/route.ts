import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const classTypes = await prisma.classType.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(classTypes);
  } catch (error) {
    console.error("Failed to fetch class types:", error);
    return NextResponse.json(
      { error: "Failed to fetch class types" },
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
    const {
      name,
      description,
      durationMinutes,
      defaultCapacity,
      difficulty,
      image,
      isActive,
    } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const classType = await prisma.classType.create({
      data: {
        name,
        description,
        durationMinutes: durationMinutes ?? 60,
        defaultCapacity: defaultCapacity ?? 12,
        difficulty,
        image,
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json(classType, { status: 201 });
  } catch (error) {
    console.error("Failed to create class type:", error);
    return NextResponse.json(
      { error: "Failed to create class type" },
      { status: 500 }
    );
  }
}
