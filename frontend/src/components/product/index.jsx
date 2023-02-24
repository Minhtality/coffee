import * as Styled from "./index.styled";
import Link from "next/link";

export default function Index({ product }) {
  const { title, price, description, image, slug } = product.attributes;
  const { url, name } = image.data.attributes.formats.small;
  return (
    <Link href={`/product/${slug}`}>
      <Styled.ProductWrapper>
        <Styled.ImageWrapper>
          <img src={url} alt={name} />
        </Styled.ImageWrapper>
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <h3>{price}</h3>
      </Styled.ProductWrapper>
    </Link>
  );
}
