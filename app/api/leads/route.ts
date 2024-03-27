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
      status: body.status,
      budgetFrom: body.budgetFrom,
      budgetTo: body.budgetTo,
      lookingFor: body.lookingFor,
      area: body.area,
      beds: body.beds,
      propertyType: body.propertyType,
      extra: body.extra,
      comment: body.comment,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(lead);
}
