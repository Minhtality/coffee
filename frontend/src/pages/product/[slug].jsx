import { useQuery } from "urql";
import { GET_PRODUCT_QUERY } from "queries/query";
import { useRouter } from "next/router";
import * as Styled from "./index.styled";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";

const Page = () => {
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
          <button>
            <AiFillMinusCircle />
          </button>
          <p>0</p>
          <button>
            <AiFillPlusCircle />
          </button>
        </Styled.Quantity>
        <Styled.Buy>Add to cart</Styled.Buy>
      </Styled.Details>
    </Styled.ProductDetails>
  );
};

export default Page;
