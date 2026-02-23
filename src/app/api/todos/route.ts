import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const todos = await prisma.todo.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(todos);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { title } = body as { title: string };

  if (!title || typeof title !== "string" || title.trim() === "") {
    return NextResponse.json(
      { error: "Title is required" },
      { status: 400 }
    );
  }

  const todo = await prisma.todo.create({
    data: { title: title.trim() },
  });
  return NextResponse.json(todo, { status: 201 });
}
