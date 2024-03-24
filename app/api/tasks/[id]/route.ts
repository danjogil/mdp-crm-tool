import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  const { title, description, status } = body;

  const task = await prisma.task.findUnique({
    where: { id: params?.id },
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const task = await prisma.task.findUnique({
    where: { id: params?.id },
  });

  if (!task)
    return NextResponse.json({ error: "Invalid task" }, { status: 404 });

  await prisma.task.delete({
    where: { id: task.id },
  });

  return NextResponse.json({});
}
