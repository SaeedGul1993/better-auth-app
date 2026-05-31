"use server";

import { prisma } from "@/lib/prisma";
import { cacheTag } from "next/cache";
import { cache } from "react";

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
  } catch (error) {
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
  } catch (error) {
    throw new Error("Failed to fetch user info");
  }
}

export const getUser = cache(async (id: string) => {
  return getUserDetailById(id);
});
