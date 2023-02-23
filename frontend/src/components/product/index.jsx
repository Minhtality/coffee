import * as Styled from "./index.styled"

export default function Index({ product }) {
  const { title, price, description, image } = product.attributes;
  const { url, name } = image.data.attributes.formats.small;
  return (
    <Styled.ProductWrapper>
      <div>
        <img src={url} alt={name} />
      </div>
      <h2>{title}</h2>
      <h3>{price}</h3>
      <p>{description}</p>
    </Styled.ProductWrapper>
  );
}
