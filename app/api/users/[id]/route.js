import { db } from "@/lib";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = await params;
  const row = await db.select().from(users).where(eq(users.id, id)).limit(1);

  if (!row.length) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(row[0]);
}

export async function PUT(req, { params }) {
  const body = await req.json();
  const { id } = await params;
  const { name, username, role } = body;

  if (!name || !username || !role) {
    return NextResponse.json(
      { error: "Full name, username, and role are required" },
      { status: 400 }
    );
  }

  const result = await db
    .update(users)
    .set({ name, username, role })
    .where(eq(users.id, id))
    .run();

  if (result.changes === 0) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ id, name, username, role }, { status: 200 });
}

export async function DELETE(req, { params }) {
  const { id } = await params;

  const result = await db
    .update(users)
    .set({ deleted_at: new Date().toISOString() })
    .where(eq(users.id, id))
    .run();

  if (result.changes === 0) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(
    { id, message: "User deleted successfully" },
    { status: 200 }
  );
}
