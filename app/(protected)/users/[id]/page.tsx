import { getUser } from "@/actions/user-actions";
import { Metadata } from "next";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const user = await getUser(id);

  return {
    title: user?.name ? `${user.name} Profile` : "User Details",
    description: user?.email
      ? `Profile page of ${user.name} (${user.email})`
      : "User profile details",
  };
}

export default async function UserDetailsPage({ params }: Props) {
  const { id } = await params;
  const user = await getUser(id);

  return (
    <main className="p-10 space-y-4">
      <h1 className="text-4xl font-bold">User Details</h1>

      <div className="border p-6 rounded">
        <p>
          <strong>Name:</strong> {user?.name}
        </p>

        <p>
          <strong>Email:</strong> {user?.email}
        </p>

        <p>
          <strong>ID:</strong> {user?.id}
        </p>
      </div>
    </main>
  );
}
