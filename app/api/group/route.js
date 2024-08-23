import prisma from "@/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET() {
  const group = await prisma.group.findMany();
  return NextResponse.json({ group });
}

export async function POST(request) {
  const { name } = await request.json();
  const group = await prisma.group.upsert({
    where: {
      name,
    },
    update: {
      name,
    },
    create: {
      name,
    },
  });
  return NextResponse.json({ group });
}
