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

  let condition = undefined;

  if (search) {
    if (type && searchFieldMap[type]) {
      condition = like(searchFieldMap[type], `%${search}%`);
    } else {
      const conditions = Object.values(searchFieldMap).map((item) => {
        return like(item, `%${search}%`);
      });
      condition = or(...conditions);
    }
  }

  condition = and(condition, isNull(books.deleted_at));

  const rows = await db
    .select()
    .from(books)
    .where(condition || sql`1=1`)
    .limit(limit)
    .offset(offset);

  const [{ count }] = await db
    .select({ count: sql`count(*)` })
    .from(books)
    .where(condition || sql`1=1`);

  return NextResponse.json(
    {
      data: rows,
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
    },
    { status: 200 }
  );
}

export async function POST(req) {
  const body = await req.json();
  const { title, author, qty } = body;

  if (!title || !author || !qty) {
    return NextResponse.json(
      { error: "book title, author, and quantity are required" },
      { status: 400 }
    );
  }

  const result = db
    .insert(books)
    .values({ title, author, available_qty: parseInt(qty, 10) })
    .run();

  return NextResponse.json(
    { id: result.lastInsertRowid, title, author, available_qty: qty },
    { status: 201 }
  );
}
