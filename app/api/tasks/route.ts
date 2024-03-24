import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request: NextRequest) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const task = await prisma.task.create({
    data: {
      title: body.title,
      description: body.description,
      status: body.status,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(task);
}

export async function PATCH(request: NextRequest, { id }: { id: string }) {
  const body = await request.json();

  const { title, description, status } = body;

  const task = await prisma.task.findUnique({
    where: { id },
  });

  if (!task)
    return NextResponse.json({ error: "Invalid task" }, { status: 404 });

  const updatedTask = await prisma.task.update({
    where: { id: task.id },
    data: {
      title,
      description,
      status,
    },
  });

  return NextResponse.json(updatedTask);
}

export async function DELETE(request: NextRequest, { id }: { id: string }) {
  const task = await prisma.task.findUnique({
    where: { id },
  });

  if (!task)
    return NextResponse.json({ error: "Invalid task" }, { status: 404 });

  await prisma.lead.delete({
    where: { id: task.id },
  });

  return NextResponse.json({});
}
