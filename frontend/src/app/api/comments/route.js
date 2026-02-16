import { NextResponse } from "next/server";
import { getSession } from "@auth0/nextjs-auth0";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(req) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { photoId, body } = await req.json();

    if (!photoId || !body?.trim()) {
      return NextResponse.json(
        { error: "Missing photoId or comment body" },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    const { error } = await supabase.from("photo_comments").insert({
      photo_id: photoId,
      user_email: session.user.email,
      user_name: session.user.name || session.user.email,
      body: body.trim(),
      approved: false,
    });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Comment submit error:", error);
    return NextResponse.json(
      { error: "Failed to submit comment" },
      { status: 500 }
    );
  }
}
