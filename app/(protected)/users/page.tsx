import UserList from "@/components/userList";
import { Suspense } from "react";

export default async function UsersPage() {
  return (
    <main className="p-10 w-full">
      <h1 className="text-3xl font-bold mb-6">Users List</h1>

      <div className="space-y-4 w-[100]">
        <Suspense fallback={"Loading..."}>
          <UserList />
        </Suspense>
      </div>
    </main>
  );
}
