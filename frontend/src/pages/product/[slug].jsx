/* eslint-disable @next/next/no-img-element */
import { useQuery } from "urql";
import { GET_PRODUCT_QUERY } from "queries/query";
import { useRouter } from "next/router";
import * as Styled from "@/styles/Product.styled";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { useProductContext } from "@/context";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { formatPrice } from "@/packages/utils";
import { useMobileBreakpoint } from "@/components/breakpoints";

const Page = () => {
  const isMobile = useMobileBreakpoint();

  const { qty, setQty, incrementQty, decrementQty, onAddToCart } =
    useProductContext();

  useEffect(() => {
    setQty(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  const handlePlural = qty > 1 ? "items" : "item";
  const notify = () =>
    toast.success(`${qty} ${handlePlural} added to cart!`, {
      duration: 2000,
      icon: "👍",
      position: isMobile ? "bottom-center" : "top-center",
    });

  const handleAddToCart = () => {
    onAddToCart(product, qty);
    notify();
  };

  return (
    <Styled.ProductDetails>
      <Styled.ImageWrapper>
        <img src={url} alt={title} />
      </Styled.ImageWrapper>
      <Styled.Details>
        <h3>{title}</h3>
        <p>{formatPrice(price)}</p>
        <p>{description}</p>

        <Styled.Quantity>
          <span>Qty:</span>
          <button onClick={decrementQty}>
            <AiFillMinusCircle />
          </button>
          <p>{qty}</p>
          <button onClick={incrementQty}>
            <AiFillPlusCircle />
          </button>
        </Styled.Quantity>
        <Styled.Buy onClick={handleAddToCart}>Add to cart</Styled.Buy>
      </Styled.Details>
    </Styled.ProductDetails>
  );
};

export default Page;
