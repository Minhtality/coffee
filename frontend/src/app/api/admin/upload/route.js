import { NextResponse } from "next/server";
import { getSession } from "@auth0/nextjs-auth0";
import { createAdminClient } from "@/lib/supabase/admin";
import { v2 as cloudinary } from "cloudinary";
import crypto from "crypto";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const session = await getSession();
    if (!session?.user?.email || session.user.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const formData = await req.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const city = formData.get("city");
    const country = formData.get("country");
    const imageFile = formData.get("image");

    if (!title || !city || !country || !imageFile) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Convert file to base64 data URI
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString("base64");
    const mimeType = imageFile.type || "image/jpeg";
    const dataUri = `data:${mimeType};base64,${base64}`;

    // Upload to Cloudinary via SDK
    const cloudinaryResult = await cloudinary.uploader.upload(dataUri);
    const { secure_url, width, height } = cloudinaryResult;

    // Supabase operations
    const supabase = createAdminClient();

    // Upsert location
    const { data: existingLocation } = await supabase
      .from("locations")
      .select("id")
      .eq("city", city)
      .eq("country", country)
      .single();

    let locationId;
    if (existingLocation) {
      locationId = existingLocation.id;
    } else {
      const { data: newLocation, error: locError } = await supabase
        .from("locations")
        .insert({ city, country })
        .select("id")
        .single();
      if (locError) throw locError;
      locationId = newLocation.id;
    }

    // Generate slug
    const slug =
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") +
      "-" +
      crypto.randomBytes(3).toString("hex");

    // Insert photo
    const { data: photo, error: photoError } = await supabase
      .from("photos")
      .insert({
        title,
        description: description || null,
        slug,
        location_id: locationId,
      })
      .select("*")
      .single();
    if (photoError) throw photoError;

    // Insert photo_image
    const { error: imageError } = await supabase
      .from("photo_images")
      .insert({
        photo_id: photo.id,
        url: secure_url,
        width,
        height,
      });
    if (imageError) throw imageError;

    return NextResponse.json({ success: true, photo });
  } catch (error) {
    console.error("Admin upload error:", error);
    return NextResponse.json(
      { error: error.message || "Upload failed" },
      { status: 500 }
    );
  }
}
