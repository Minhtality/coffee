import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const fingerprint = searchParams.get("fingerprint");

    const supabase = createAdminClient();

    // Get all likes
    const { data: likes, error } = await supabase
      .from("photo_likes")
      .select("photo_id, fingerprint");

    if (error) throw error;

    // Build counts map and user likes set
    const counts = {};
    const userLikes = [];

    for (const like of likes || []) {
      const pid = Number(like.photo_id);
      counts[pid] = (counts[pid] || 0) + 1;
      if (fingerprint && like.fingerprint === fingerprint) {
        userLikes.push(pid);
      }
    }

    return NextResponse.json({ counts, userLikes }, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("Like counts error:", error);
    return NextResponse.json(
      { error: "Failed to fetch like counts" },
      { status: 500 }
    );
  }
}
