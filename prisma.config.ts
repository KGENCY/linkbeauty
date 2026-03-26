import path from "node:path";
import { defineConfig } from "prisma/config";
import { config } from "dotenv";

const env = config();

export default defineConfig({
  schema: path.join(__dirname, "prisma", "schema.prisma"),
  datasource: {
    url: env.parsed?.DATABASE_URL ?? process.env.DATABASE_URL!,
  },
});
