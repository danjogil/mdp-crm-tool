import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request: NextRequest) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const viewing = await prisma.viewing.create({
    data: {
      title: body.title,
      comment: body.comment,
      status: body.status,
      userId: currentUser?.id,
    },
  });

  return NextResponse.json(viewing);
}
