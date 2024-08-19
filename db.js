import { PrismaClient } from "@prisma/client";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

let prisma;
if (process.env.NODE_ENV !== "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      log: ["error"],
      errorFormat: "pretty",
    });
  }
  prisma = global.prisma;
}

export default prisma;
