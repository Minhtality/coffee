import { getProductBySlug } from "@/lib/queries";
import ProductDetail from "./ProductDetail";

export default async function ProductPage({ params }) {
  const product = await getProductBySlug(params.slug);
  return <ProductDetail product={product} />;
}
