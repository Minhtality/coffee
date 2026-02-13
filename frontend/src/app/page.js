import { getPhotos } from "@/lib/queries";
import PhotoGallery from "./PhotoGallery";

export const metadata = {
  title: "Minhtality",
  description: "Minh's passion projects.",
};

export default async function Home() {
  const photos = await getPhotos();
  return (
    <main>
      <PhotoGallery photos={photos} />
    </main>
  );
}
