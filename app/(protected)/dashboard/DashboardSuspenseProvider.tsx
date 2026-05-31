import { getSessionAction } from "@/actions/auth-actions";

export default async function DashboardSessionProvider() {
  const session = await getSessionAction();

  return (
    <div className="">
      <div>Welcome {session.data?.user?.name}</div>
      <br />
      <div>Email: {session.data?.user?.email}</div>{" "}
    </div>
  );
}
