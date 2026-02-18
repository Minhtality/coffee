import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";
import AdminUpload from "./AdminUpload";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

export default async function AdminPage() {
  const session = await getSession();

  if (!session?.user?.email || session.user.email !== ADMIN_EMAIL) {
    redirect("/");
  }

  return <AdminUpload />;
}
