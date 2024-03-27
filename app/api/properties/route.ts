import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request: NextRequest) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const property = await prisma.property.create({
    data: {
      location: body.location,
      type: body.type,
      price: body.price,
      beds: body.beds,
      propertyType: body.propertyType,
      agent: body.agent,
      conditions: body.conditions,
      status: body.status,
      date: body.date,
      complexName: body.complexName,
      reference: body.reference,
      propertyLink: body.propertyLink,
      locationLink: body.locationLink,
      userId: currentUser?.id,
    },
  });

  return NextResponse.json(property);
}
