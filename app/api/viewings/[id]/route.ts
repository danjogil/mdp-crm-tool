import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  const { title, comment } = body;

  const viewing = await prisma.viewing.findUnique({
    where: { id: params?.id },
  });

  if (!viewing)
    return NextResponse.json({ error: "Invalid viewing" }, { status: 404 });

  const updatedViewing = await prisma.viewing.update({
    where: { id: viewing.id },
    data: {
      title,
      comment,
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
