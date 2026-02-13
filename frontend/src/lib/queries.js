import { createClient } from "@/lib/supabase/server";

export async function getProducts() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data;
}

export async function getProductBySlug(slug) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) throw error;
  return data;
}

export async function getPhotos() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("photos")
    .select(`
      *,
      photo_images (*),
      locations (*)
    `)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data;
}
