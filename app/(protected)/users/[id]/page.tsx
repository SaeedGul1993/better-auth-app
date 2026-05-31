import UserInfoItem from "@/components/userInfoItem";
import { Suspense } from "react";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function UserDetailsPage({ params }: Props) {
  return (
    <main className="p-10 space-y-4">
      <h1 className="text-4xl font-bold">User Details</h1>
      <Suspense fallback={"Loading..."}>
        <UserInfoItem params={params} />
      </Suspense>
    </main>
  );
}
