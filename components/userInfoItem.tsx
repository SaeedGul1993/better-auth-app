import { getCachedUserDetail } from "@/actions/user-queries";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const UserInfoItem = async ({ params }: Props) => {
  const { id } = await params;
  const user = await getCachedUserDetail(id);

  return (
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
  );
};

export default UserInfoItem;
