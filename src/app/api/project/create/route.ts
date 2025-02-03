// src/app/api/project/create/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export async function POST(req: Request) {
  // Verify that the user is authenticated.
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { businessId, name, description } = await req.json();
  if (!businessId || !name) {
    return NextResponse.json(
      { error: "Business ID and project name are required" },
      { status: 400 }
    );
  }

  // Fetch the business record
  const business = await prisma.business.findUnique({
    where: { id: businessId },
  });
  if (!business) {
    return NextResponse.json({ error: "Business not found" }, { status: 404 });
  }
  // Verify ownership: only the business owner can create a project
  if (business.ownerId !== session.user.id) {
    return NextResponse.json(
      { error: "You are not authorized to create a project for this business" },
      { status: 403 }
    );
  }

  try {
    // Create the project now that ownership is confirmed.
    const project = await prisma.project.create({
      data: {
        name,
        description,
        businessId,
      },
    });
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
        );
        console.error(error);
  }
}
