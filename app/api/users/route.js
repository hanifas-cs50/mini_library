import bcrypt from "bcrypt";
import { db } from "@/lib";
import { users } from "@/lib/schema";
import { and, isNull, like, or, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

const searchFieldMap = {
  name: users.name,
  username: users.username,
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

  condition = and(condition, isNull(users.deleted_at));

  const rows = await db
    .select({
      id: users.id,
      name: users.name,
      username: users.username,
      role: users.role,
    })
    .from(users)
    .where(condition || sql`1=1`)
    .limit(limit)
    .offset(offset);

  const [{ count }] = await db
    .select({ count: sql`count(*)` })
    .from(users)
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
  const { name, username, password } = body;

  if (!name || !username || !password) {
    return NextResponse.json(
      { error: "full name, username, and password are required" },
      { status: 400 }
    );
  }

  const hashed = await bcrypt.hash(password, 10);
  console.log(`Hashed Password: ${hashed}`);

  try {
    const result = db
      .insert(users)
      .values({ name, username, password: hashed })
      .run();
    // , role: "admin"

    return NextResponse.json({ name, username }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
