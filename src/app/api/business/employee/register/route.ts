// src/app/api/business/employee/register/route.ts
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

  // Parse the incoming JSON body.
  const { businessId, name, role } = await req.json();
  if (!businessId || !name || !role) {
    return NextResponse.json(
      { error: "Business ID, Employee name, and role are required" },
      { status: 400 }
    );
  }

  // Fetch the business record.
  const business = await prisma.business.findUnique({
    where: { id: businessId },
  });
  if (!business) {
    return NextResponse.json({ error: "Business not found" }, { status: 404 });
  }
  // Verify that the current user is the owner.
  if (business.ownerId !== session.user.id) {
    return NextResponse.json(
      { error: "You are not authorized to add an employee for this business" },
      { status: 403 }
    );
  }

  try {
    // Create the new employee record.
    const employee = await prisma.employee.create({
      data: {
        name,
        role,
        businessId,
      },
    });
    return NextResponse.json(employee);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to register employee" },
      { status: 500 }
        );
        console.error(error);
  }
}
