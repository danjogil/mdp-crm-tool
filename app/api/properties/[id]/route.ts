import prisma from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  const {
    location,
    type,
    price,
    beds,
    propertyType,
    agent,
    conditions,
    status,
  } = body;

  const property = await prisma.property.findUnique({
    where: { id: params?.id },
  });

  if (!property)
    return NextResponse.json({ error: "Invalid property" }, { status: 404 });

  const updatedProperty = await prisma.property.update({
    where: { id: property.id },
    data: {
      location,
      type,
      price,
      beds,
      propertyType,
      agent,
      conditions,
      status,
    },
  });

  return NextResponse.json(updatedProperty);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const property = await prisma.property.findUnique({
    where: { id: params.id },
  });

  if (!property)
    return NextResponse.json({ error: "Invalid property" }, { status: 404 });

  await prisma.property.delete({
    where: { id: property.id },
  });

  return NextResponse.json({});
}
