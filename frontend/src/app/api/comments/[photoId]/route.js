import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function GET(req, context) {
  try {
    const { photoId } = await context.params;
    const supabase = createAdminClient();

    const { data: allComments, error } = await supabase
      .from("photo_comments")
      .select("id, user_name, body, created_at, approved, photo_id")
      .eq("photo_id", Number(photoId));

    if (error) throw error;

    const comments = (allComments || []).filter((c) => c.approved === true);

    return NextResponse.json({ comments });
  } catch (error) {
    console.error("Fetch comments error:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}
