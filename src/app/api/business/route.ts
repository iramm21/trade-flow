// src/app/api/business/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export async function GET(request: Request) {
  // Validate the session
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Optionally, you can also extract query parameters (e.g., ownerId)
  const { searchParams } = new URL(request.url);
  const ownerId = searchParams.get("ownerId");

  // Only return businesses where the current user is the owner
  const businesses = await prisma.business.findMany({
    where: { ownerId: ownerId || session.user.id },
  });
  return NextResponse.json(businesses);
}
