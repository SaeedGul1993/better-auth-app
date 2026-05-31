"use client";

import { logoutAction } from "@/actions/auth-actions";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleSubmit = async () => {
    const res = await logoutAction();
    if (res.success) {
      router.push("/");
    }
  };
  return (
    <form action={handleSubmit}>
      <button type="submit" className="border px-4 py-2 rounded">
        Logout
      </button>
    </form>
  );
}
