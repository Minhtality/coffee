"use client";

/* eslint-disable @next/next/no-img-element */
import * as Styled from "./index.styled";
import { formatPrice } from "@/packages/utils";

export default function Index({ product, variants }) {
  const { title, price, image_url, slug } = product;
  return (
    <Styled.Product variants={variants} href={`/product/${slug}`}>
      <Styled.ProductWrapper>
        <Styled.ImageWrapper>
          <img src={image_url} alt={title} />
        </Styled.ImageWrapper>
        <Styled.ProductInfo>
          <h2>{title}</h2>
          <h3>{formatPrice(price)}</h3>
        </Styled.ProductInfo>
      </Styled.ProductWrapper>
    </Styled.Product>
  );
}
