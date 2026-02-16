import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";
import CommentModeration from "./CommentModeration";

const ADMIN_EMAIL = "mtran1712@gmail.com";

export default async function AdminCommentsPage() {
  const session = await getSession();

  if (!session?.user?.email || session.user.email !== ADMIN_EMAIL) {
    redirect("/");
  }

  return <CommentModeration />;
}
