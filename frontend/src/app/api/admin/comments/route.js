import { NextResponse } from "next/server";
import { getSession } from "@auth0/nextjs-auth0";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

export async function GET() {
  try {
    const session = await getSession();
    if (!session?.user?.email || session.user.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const supabase = createAdminClient();

    const { data: comments, error } = await supabase
      .from("photo_comments")
      .select("id, photo_id, user_name, user_email, body, created_at, photos(title)")
      .eq("approved", false)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ comments: comments || [] });
  } catch (error) {
    console.error("Admin fetch comments error:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  try {
    const session = await getSession();
    if (!session?.user?.email || session.user.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { commentId, action } = await req.json();

    if (!commentId || !["approve", "reject"].includes(action)) {
      return NextResponse.json(
        { error: "Invalid commentId or action" },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    if (action === "approve") {
      const { error } = await supabase
        .from("photo_comments")
        .update({ approved: true })
        .eq("id", commentId);
      if (error) throw error;
    } else {
      const { error } = await supabase
        .from("photo_comments")
        .delete()
        .eq("id", commentId);
      if (error) throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin comment action error:", error);
    return NextResponse.json(
      { error: "Failed to process comment" },
      { status: 500 }
    );
  }
}
