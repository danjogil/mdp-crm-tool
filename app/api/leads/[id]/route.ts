import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  const {
    name,
    number,
    email,
    date,
    nationality,
    status,
    budget,
    area,
    beds,
    property,
    extra,
    comment,
  } = body;

  const lead = await prisma.lead.findUnique({
    where: { id: params?.id },
  });

  if (!lead)
    return NextResponse.json({ error: "Invalid lead" }, { status: 404 });

  const updatedLead = await prisma.lead.update({
    where: { id: lead.id },
    data: {
      name,
      number,
      email,
      date,
      nationality,
      status,
      budget,
      area,
      beds,
      property,
      extra,
      comment,
    },
  });

  return NextResponse.json(updatedLead);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const lead = await prisma.lead.findUnique({
    where: { id: params.id },
  });

  if (!lead)
    return NextResponse.json({ error: "Invalid lead" }, { status: 404 });

  await prisma.lead.delete({
    where: { id: lead.id },
  });

  return NextResponse.json({});
}
