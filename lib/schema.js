import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull(),
  deleted_at: text("deleted_at"), // null if active
});

const books = sqliteTable("books", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  author: text("author").notNull(),
  available_qty: integer("available_qty").notNull(),
  deleted_at: text("deleted_at"), // null if active
});

const borrow_log = sqliteTable("borrow_log", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  user_id: integer("user_id").references(() => users.id).notNull(),
  book_id: integer("book_id").references(() => books.id).notNull(),
  borrow_date: text("borrow_date").notNull(),
  return_date: text("return_date"), // null if not returned yet
});

export { users, books, borrow_log };
