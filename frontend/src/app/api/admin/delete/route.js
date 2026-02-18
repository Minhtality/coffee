import { NextResponse } from "next/server";
import { getSession } from "@auth0/nextjs-auth0";
import { createAdminClient } from "@/lib/supabase/admin";
import { v2 as cloudinary } from "cloudinary";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function DELETE(req) {
  try {
    const session = await getSession();
    if (!session?.user?.email || session.user.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { photoId } = await req.json();
    if (!photoId) {
      return NextResponse.json(
        { error: "Missing photoId" },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // Fetch photo_images to get Cloudinary URLs
    const { data: images, error: fetchError } = await supabase
      .from("photo_images")
      .select("url")
      .eq("photo_id", photoId);

    if (fetchError) throw fetchError;

    // Delete images from Cloudinary
    for (const image of images || []) {
      try {
        // Extract public_id from Cloudinary URL
        // URL format: https://res.cloudinary.com/<cloud>/image/upload/v123/public_id.ext
        const urlParts = image.url.split("/upload/");
        if (urlParts[1]) {
          const pathWithExt = urlParts[1].replace(/^v\d+\//, "");
          const publicId = pathWithExt.replace(/\.[^.]+$/, "");
          await cloudinary.uploader.destroy(publicId);
        }
      } catch (cloudErr) {
        console.error("Cloudinary delete error:", cloudErr);
      }
    }

    // Delete photo_images first, then the photo
    const { error: imgDeleteError } = await supabase
      .from("photo_images")
      .delete()
      .eq("photo_id", photoId);

    if (imgDeleteError) throw imgDeleteError;

    const { error: photoDeleteError } = await supabase
      .from("photos")
      .delete()
      .eq("id", photoId);

    if (photoDeleteError) throw photoDeleteError;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin delete error:", error);
    return NextResponse.json(
      { error: error.message || "Delete failed" },
      { status: 500 }
    );
  }
}
