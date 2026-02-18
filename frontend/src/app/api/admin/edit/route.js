import { NextResponse } from "next/server";
import { getSession } from "@auth0/nextjs-auth0";
import { createAdminClient } from "@/lib/supabase/admin";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

export async function PATCH(req) {
  try {
    const session = await getSession();
    if (!session?.user?.email || session.user.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { photoId, title, description } = await req.json();
    if (!photoId) {
      return NextResponse.json(
        { error: "Missing photoId" },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("photos")
      .update({ title, description })
      .eq("id", photoId)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ photo: data });
  } catch (error) {
    console.error("Admin edit error:", error);
    return NextResponse.json(
      { error: error.message || "Edit failed" },
      { status: 500 }
    );
  }
}
