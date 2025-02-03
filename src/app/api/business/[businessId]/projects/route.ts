// src/app/api/business/[businessId]/projects/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { businessId: string } }
) {
  const { businessId } = await params;
  try {
    // Adjust the query as needed for your schema:
    const projects = await prisma.project.findMany({
      where: { businessId },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Error fetching projects" },
      { status: 500 }
    );
  }
}
