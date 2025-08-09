import bcrypt from "bcrypt";
import { db } from "@/lib";
import { users } from "@/lib/schema";
import { like, or } from "drizzle-orm";
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
    condition = like(searchFieldMap[type], `%${search}%`);
  } else {
    const conditions = Object.values(searchFieldMap).map((item) => {
      return like(item, `%${search}%`);
    });
    condition = or(...conditions);
  }

  const rows = await db
    .select()
    .from(users)
    .where(condition || sql`1=1`)
    .limit(limit)
    .offset(offset);

  const [{ count }] = await db
    .select({ count: sql < number > `count(*)` })
    .from(users)
    .where(condition || sql`1=1`);

  return NextResponse.json({
    data: rows,
    total: count,
    page,
    totalPages: Math.ceil(count / limit),
  }, { status: 200 });
}

export async function POST(req) {
  const body = await req.json();
  const { name, username, password } = body;

  if (!name || !username || !password) {
    return NextResponse.json({ error: "full name, username, and password are required" }, { status: 400 })
  }

  const hashed = await bcrypt.hash(password, 10);
  console.log(`Hashed Password: ${hashed}`);

  // const result = db.insert(users).values({ name, username, password: hashed }).run();
  // return NextResponse.json({ username, password: hashed }, { status: 201 });
}
