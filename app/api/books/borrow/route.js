import { db } from "@/lib";
import { books, borrow_log, users } from "@/lib/schema";
import { eq, isNull, like, lt, or, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

const diffTime = new Date();
diffTime.setDate(diffTime.getDate() - 7);

const searchFieldMap = {
  user_id: borrow_log.user_id,
  book_id: borrow_log.book_id,
};

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const type = searchParams.get("type") || "";
  const search = searchParams.get("search") || "";
  const overdue = searchParams.get("overdue") === "true";
  const not_returned = searchParams.get("not_returned") === "true";
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

  // something is overdue when 7 days ago has passed
  // when 7 days ago is greater than 8 days ago
  // if borrow date value is lesser than 7 days ago then it's overdue
  // borrow date < 7 days ago
  if (overdue) {
    condition = and(
      condition,
      lt(borrow_log.borrow_date, diffTime.toISOString())
    );
  }

  // if return date is null, means that it's not returned yet
  if (not_returned) {
    condition = and(condition, isNull(borrow_log.return_date));
  }

  const rows = await db
    .select({
      id: borrow_log.id,
      user_id: borrow_log.user_id,
      username: users.username,
      book_id: borrow_log.book_id,
      title: books.title,
      borrow_date: borrow_log.borrow_date,
      return_date: borrow_log.return_date,
    })
    .from(borrow_log)
    .leftJoin(users, eq(borrow_log.user_id, users.id))
    .leftJoin(books, eq(borrow_log.book_id, books.id))
    .where(condition || sql`1=1`)
    .limit(limit)
    .offset(offset);

  const [{ count }] = await db
    .select({ count: sql`count(*)` })
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
  const { user_id, book_id } = body;

  if (!user_id || !book_id) {
    return NextResponse.json(
      { error: "user and book information are required" },
      { status: 400 }
    );
  }

  const borrow_date = new Date().toISOString();

  const result = db
    .insert(borrow_log)
    .values({ user_id, book_id, borrow_date })
    .run();

  return NextResponse.json(
    { id: result.lastInsertRowid, user_id, book_id, borrow_date },
    { status: 201 }
  );
}
