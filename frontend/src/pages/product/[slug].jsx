import { useQuery } from "urql";
import { GET_PRODUCT_QUERY } from "queries/query";
import { useRouter } from "next/router";
import * as Styled from "./index.styled";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { useProductContext } from "@/context";
import { useEffect } from "react";

const Page = () => {
  const { qty, setQty, incrementQty, decrementQty, onAddToCart } =
    useProductContext();

  useEffect(() => {
    setQty(1);
  }, []);

  const router = useRouter();
  const { query } = router;
  const [results] = useQuery({
    query: GET_PRODUCT_QUERY,
    variables: { slug: query.slug },
  });
  const { data, fetching, error } = results;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  const product = data.products.data[0].attributes;

  const { title, price, description, image } = product;
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
        <Styled.Buy onClick={() => onAddToCart(product, qty)}>
          Add to cart
        </Styled.Buy>
      </Styled.Details>
    </Styled.ProductDetails>
  );
};

export default Page;
