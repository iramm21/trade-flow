// src/app/api/business/register/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name } = await req.json();
  if (!name) {
    return NextResponse.json(
      { error: "Business name is required" },
      { status: 400 }
    );
  }

  try {
    const business = await prisma.business.create({
      data: {
        name,
        ownerId: session.user.id, // Now TypeScript knows that id exists
      },
    });
    return NextResponse.json(business);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to register business" },
      { status: 500 }
        );
        console.error(error);
  }
}
