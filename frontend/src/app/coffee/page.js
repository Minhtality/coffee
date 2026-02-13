import { getProducts } from "@/lib/queries";
import ProductListing from "./ProductListing";

export const metadata = {
  title: "Good Soup.",
  description: "Coffee products",
};

export default async function CoffeePage() {
  const products = await getProducts();
  return (
    <main>
      <ProductListing products={products} />
    </main>
  );
}
