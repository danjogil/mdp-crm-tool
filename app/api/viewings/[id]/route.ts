import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  const { lead, property, date } = body;

  const viewing = await prisma.viewing.findUnique({
    where: { id: params?.id },
  });

  if (!viewing)
    return NextResponse.json({ error: "Invalid viewing" }, { status: 404 });

  const updatedViewing = await prisma.viewing.update({
    where: { id: viewing.id },
    data: {
      lead,
      property,
      date,
    },
  });

  return NextResponse.json(updatedViewing);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const viewing = await prisma.viewing.findUnique({
    where: { id: params?.id },
  });

  if (!viewing)
    return NextResponse.json({ error: "Invalid viewing" }, { status: 404 });

  await prisma.viewing.delete({
    where: { id: viewing.id },
  });

  return NextResponse.json({});
}
