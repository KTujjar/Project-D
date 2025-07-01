import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const todos = await prisma.todo.findMany({ orderBy: { id: "asc" } });
  return NextResponse.json(todos);
}

export async function POST(req: Request) {
  const { title } = await req.json();
  const newTodo = await prisma.todo.create({ data: { title } });
  return NextResponse.json(newTodo);
}

export async function PUT(req: Request) {
  const { id, completed } = await req.json();
  const updated = await prisma.todo.update({
    where: { id },
    data: { completed },
  });
  return NextResponse.json(updated);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  await prisma.todo.delete({ where: { id } });
  return NextResponse.json({ success: true });
}