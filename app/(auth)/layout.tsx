import { getSessionAction } from "@/actions/auth-actions";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let session = await getSessionAction();

  if (session?.data) return redirect("/dashboard");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      {children}
    </div>
  );
}
