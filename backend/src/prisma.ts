import { PrismaClient } from "@prisma/client/edge";
import dotenv from "dotenv";
import { withAccelerate } from "@prisma/extension-accelerate";
dotenv.config();
export const prisma = new PrismaClient().$extends(withAccelerate());
