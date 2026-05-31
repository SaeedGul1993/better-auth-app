"use server";

import { prisma } from "@/lib/prisma";
import { cacheTag } from "next/cache";

export async function getUsers() {
  "use cache";
  cacheTag("users");
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return users;
  } catch {
    throw new Error("Failed to fetch users");
  }
}

export async function getUserDetailById(id: string) {
  try {
    const userInfo = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return userInfo;
  } catch {
    throw new Error("Failed to fetch user info");
  }
}
