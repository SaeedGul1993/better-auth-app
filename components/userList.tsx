import { getUsers } from "@/actions/user-actions";
import Link from "next/link";

type User = Awaited<ReturnType<typeof getUsers>>[number];

const UserList = async () => {
  const users = await getUsers();
  return (
    <div className="space-y-4 w-full">
      {users.map((user: User) => (
        <div className="block border p-4 rounded w-full" key={user.id}>
          <Link href={`/users/${user.id}`}>
            <h2 className="font-semibold">{user.name}</h2>
            <p>{user.email}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default UserList;
