import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(req) {
  try {
    const { photoId, fingerprint } = await req.json();

    if (!photoId || !fingerprint) {
      return NextResponse.json(
        { error: "Missing photoId or fingerprint" },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // Check if like already exists
    const { data: existing } = await supabase
      .from("photo_likes")
      .select("id")
      .eq("photo_id", photoId)
      .eq("fingerprint", fingerprint)
      .single();

    if (existing) {
      // Unlike
      const { error: deleteError } = await supabase
        .from("photo_likes")
        .delete()
        .eq("id", existing.id);
      if (deleteError) throw deleteError;
    } else {
      // Like
      const { error: insertError } = await supabase
        .from("photo_likes")
        .insert({ photo_id: photoId, fingerprint });
      if (insertError) throw insertError;
    }

    // Get updated count
    const { count } = await supabase
      .from("photo_likes")
      .select("*", { count: "exact", head: true })
      .eq("photo_id", photoId);

    return NextResponse.json({ liked: !existing, likeCount: count });
  } catch (error) {
    console.error("Like toggle error:", error);
    return NextResponse.json(
      { error: "Failed to toggle like" },
      { status: 500 }
    );
  }
}
