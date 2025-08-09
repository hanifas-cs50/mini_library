import { db } from "@/lib";
import { borrow_log } from "@/lib/schema";
import { like, lt, or } from "drizzle-orm";
import { NextResponse } from "next/server";

const diffTime = new Date();
diffTime.setDate(diffTime.getDate() - 7);

const searchFieldMap = {
  title: borrow_log.title,
  author: borrow_log.author,
};

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const type = searchParams.get("type") || "";
  const search = searchParams.get("search") || "";
  const overdue = searchParams.get("overdue") || "false";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "20", 10);
  const offset = (page - 1) * limit;

  let condition = [];

  if (overdue) {
    condition.push(
      and(lt(borrow_log.borrow_date, diffTime.toISOString()))
    )
  }

  const rows = await db
    .select()
    .from(borrow_log)
    .where(condition || sql`1=1`)
    .limit(limit)
    .offset(offset);

  const [{ count }] = await db
    .select({ count: sql < number > `count(*)` })
    .from(borrow_log)
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
    .insert(borrow_log)
    .values({ title, author, available_qty: parseInt(qty, 10) })
    .run();
  return NextResponse.json(
    { id: result.lastInsertRowid, title, author, available_qty: qty },
    { status: 201 }
  );
}

// if (search) {
//   condition = like(searchFieldMap[type], `%${search}%`);
// } else {
//   const conditions = Object.values(searchFieldMap).map((item) => {
//     return like(item, `%${search}%`);
//   });
//   condition = or(...conditions);
// }
