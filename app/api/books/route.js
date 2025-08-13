import { db } from "@/lib";
import { books } from "@/lib/schema";
import { and, isNull, like, or, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

const searchFieldMap = {
  title: books.title,
  author: books.author,
};

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") || "";
  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "20", 10);
  const offset = (page - 1) * limit;

  let condition = isNull(books.deleted_at);

  if (search) {
    if (type && searchFieldMap[type]) {
      condition = and(condition, like(searchFieldMap[type], `%${search}%`));
    } else {
      const conditions = Object.values(searchFieldMap).map((field) =>
        like(field, `%${search}%`)
      );
      condition = and(condition, or(...conditions));
    }
  }

  const rows = await db
    .select()
    .from(books)
    .where(condition)
    .limit(limit)
    .offset(offset);

  const [{ count }] = await db
    .select({ count: sql`count(*)` })
    .from(books)
    .where(condition);

  return NextResponse.json({
    data: rows,
    total: count,
    page,
    totalPages: Math.ceil(count / limit),
  });
}

export async function POST(req) {
  const { title, author, qty } = await req.json();

  if (!title || !author || !qty) {
    return NextResponse.json(
      { error: "Book title, author, and quantity are required" },
      { status: 400 }
    );
  }

  const result = await db
    .insert(books)
    .values({ title, author, available_qty: parseInt(qty, 10) })
    .run();

  return NextResponse.json(
    {
      id: result.lastInsertRowid,
      title,
      author,
      available_qty: parseInt(qty, 10),
    },
    { status: 201 }
  );
}
