/* eslint-disable @next/next/no-img-element */
import * as Styled from "./index.styled";
import { formatPrice } from "@/packages/utils";

export default function Index({ product, variants }) {
  const { title, price, image, slug } = product.attributes;
  const { url, name } = image.data.attributes.formats.small;
  return (
    <Styled.Product variants={variants} href={`/product/${slug}`}>
      <Styled.ProductWrapper>
        <Styled.ImageWrapper>
          <img src={url} alt={name} />
        </Styled.ImageWrapper>
        <Styled.ProductInfo>
          <h2>{title}</h2>
          <h3>{formatPrice(price)}</h3>
        </Styled.ProductInfo>
      </Styled.ProductWrapper>
    </Styled.Product>
  );
}
