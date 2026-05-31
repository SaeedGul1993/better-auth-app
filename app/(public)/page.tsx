import Link from "next/link";

export default function HomePage() {
  return (
    <main className="space-y-6">
      <h1 className="text-4xl font-bold">Hello User 👋</h1>

      <p className="text-lg">You want to go dashboard?</p>

      <p>First login into your account.</p>

      <div className="space-x-4">
        <Link href="/login" className="border px-4 py-2 rounded">
          Login
        </Link>

        <Link href="/signup" className="border px-4 py-2 rounded">
          Signup
        </Link>
      </div>
    </main>
  );
}
