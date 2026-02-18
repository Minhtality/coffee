import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";
import CommentModeration from "./CommentModeration";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

export default async function AdminCommentsPage() {
  const session = await getSession();

  if (!session?.user?.email || session.user.email !== ADMIN_EMAIL) {
    redirect("/");
  }

  return <CommentModeration />;
}
