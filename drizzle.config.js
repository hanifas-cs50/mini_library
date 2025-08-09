import path from "path";

export default {
  schema: "./lib/schema.js",
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials: {
    url: path.resolve("./data/database.db"),
  },
};
