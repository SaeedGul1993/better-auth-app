"use client";

import { loginAction } from "@/actions/auth-actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [loader, setLoader] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);
    const formData = new FormData(e.currentTarget);
    const res = await loginAction(formData);

    if (res.success) {
      router.push("/dashboard");
      setLoader(false);
    } else {
      alert(res.message);
      setLoader(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-10 rounded space-y-4 w-[400px]"
    >
      <h1 className="text-3xl font-bold">Login</h1>

      <input
        type="email"
        name="email"
        placeholder="Email"
        className="border p-2 w-full"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        className="border p-2 w-full"
      />

      <button
        type="submit"
        disabled={loader}
        className="bg-black text-white px-4 py-2 rounded w-full"
      >
        {loader ? `Loading....` : `Login`}
      </button>

      <p>
        No account?
        <Link href="/signup" className="ml-2 underline">
          Signup
        </Link>
      </p>
    </form>
  );
}
