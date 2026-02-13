"use client";

import Product from "@/components/product";
import { Gallery } from "@/styles/Gallery";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const item = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

export default function ProductListing({ products }) {
  return (
    <Gallery
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.05, delayChildren: 0.2 }}
    >
      {products.map((product) => (
        <Product variants={item} key={product.slug} product={product} />
      ))}
    </Gallery>
  );
}
