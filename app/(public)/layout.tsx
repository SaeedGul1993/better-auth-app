import { getSessionAction } from "@/actions/auth-actions";
import { redirect } from "next/navigation";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen p-10 bg-gray-100">{children}</div>;
}
