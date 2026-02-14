import { getPhotos } from "@/lib/queries";
import PhotoGallery from "./PhotoGallery";

export const metadata = {
  title: "Minhtality",
  description: "Minh's passion projects.",
};

export default async function Home() {
  const photos = await getPhotos();
  return (
    <main style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 1.5rem" }}>
      <PhotoGallery photos={photos} />
    </main>
  );
}
