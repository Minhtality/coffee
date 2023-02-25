import { useQuery } from "urql";
import { GET_PRODUCT_QUERY } from "queries/query";
import { useRouter } from "next/router";
import * as Styled from "./index.styled";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { useProductContext } from "@/context";

const Page = () => {
  const { qty, incrementQty, decrementQty } = useProductContext();

  const router = useRouter();
  const { query } = router;
  const [results] = useQuery({
    query: GET_PRODUCT_QUERY,
    variables: { slug: query.slug },
  });
  const { data, fetching, error } = results;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  const product = data.products.data[0];

  const { title, price, description, image } = product.attributes;
  const { url } = image.data.attributes.formats.small;
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);

  return (
    <Styled.ProductDetails>
      <img src={url} alt={title} />
      <Styled.Details>
        <h3>{title}</h3>
        <p>{description}</p>
        <p>{formattedPrice}</p>

        <Styled.Quantity>
          <span>Quantity</span>
          <button onClick={decrementQty}>
            <AiFillMinusCircle />
          </button>
          <p>{qty}</p>
          <button onClick={incrementQty}>
            <AiFillPlusCircle />
          </button>
        </Styled.Quantity>
        <Styled.Buy>Add to cart</Styled.Buy>
      </Styled.Details>
    </Styled.ProductDetails>
  );
};

export default Page;
