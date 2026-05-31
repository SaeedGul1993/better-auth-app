import LogoutButton from "@/components/logout-button";
import Link from "next/link";
import DashboardSessionProvider from "./DashboardSuspenseProvider";
import { Suspense } from "react";

export default async function DashboardPage() {
  return (
    <main className="p-10 space-y-6">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <DashboardSessionProvider />
      </Suspense>
      <LogoutButton />
      <Link href="/users" className="border px-4 py-2 rounded inline-block">
        Users
      </Link>
    </main>
  );
}
