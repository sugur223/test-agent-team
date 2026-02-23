import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const todoId = parseInt(id, 10);

  if (isNaN(todoId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const body = await request.json();
  const { title, completed } = body as {
    title?: string;
    completed?: boolean;
  };

  const data: { title?: string; completed?: boolean } = {};
  if (typeof title === "string") data.title = title.trim();
  if (typeof completed === "boolean") data.completed = completed;

  try {
    const todo = await prisma.todo.update({
      where: { id: todoId },
      data,
    });
    return NextResponse.json(todo);
  } catch {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const todoId = parseInt(id, 10);

  if (isNaN(todoId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    await prisma.todo.delete({ where: { id: todoId } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }
}
