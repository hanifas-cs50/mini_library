import { db } from "@/lib";
import { books } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = await params;
  const row = await db.select().from(books).where(eq(books.id, id)).limit(1);

  if (!row.length) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }

  return NextResponse.json(row[0]);
}

export async function PUT(req, { params }) {
  const { id } = await params;
  const { title, author, qty } = await req.json();

  if (!title || !author || !qty) {
    return NextResponse.json(
      { error: "Book title, author, and quantity are required" },
      { status: 400 }
    );
  }

  const result = await db
    .update(books)
    .set({ title, author, available_qty: parseInt(qty, 10) })
    .where(eq(books.id, id))
    .run();

  if (result.changes === 0) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }

  return NextResponse.json(
    { id, title, author, available_qty: parseInt(qty, 10) },
    { status: 200 }
  );
}

export async function DELETE(req, { params }) {
  const { id } = await params;
  const result = await db
    .update(books)
    .set({ deleted_at: new Date().toISOString() })
    .where(eq(books.id, id))
    .run();

  if (result.changes === 0) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }

  return NextResponse.json(
    { id, message: "Book deleted successfully" },
    { status: 200 }
  );
}
