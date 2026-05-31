import { cache } from "react";
import { getUsers, getUserDetailById } from "./user-actions";

export const getCachedUsers = cache(async () => {
  "use cache";
  return getUsers();
});

export const getCachedUserDetail = cache(async (id: string) => {
  "use cache";
  return getUserDetailById(id);
});
