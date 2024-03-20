import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request: NextRequest) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const lead = await prisma.lead.create({
    data: {
      name: body.name,
      number: body.number,
      email: body.email,
      date: body.date,
      nationality: body.nationality,
      type: body.type,
      budget: body.budget,
      area: body.area,
      beds: body.beds,
      property: body.property,
      extra: body.extra,
      comment: body.extra,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(lead);
}
