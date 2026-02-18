import { getPhotos } from "@/lib/queries";
import { getSession } from "@auth0/nextjs-auth0";
import PhotoGallery from "./PhotoGallery";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

export const metadata = {
  title: "Minhtality",
  description: "Minh's passion projects.",
};

export default async function Home() {
  const [photos, session] = await Promise.all([getPhotos(), getSession()]);
  const isAdmin = session?.user?.email === ADMIN_EMAIL;
  return (
    <main style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 1.5rem" }}>
      <PhotoGallery photos={photos} isAdmin={isAdmin} />
    </main>
  );
}
