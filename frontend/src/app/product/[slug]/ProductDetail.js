"use client";

/* eslint-disable @next/next/no-img-element */
import * as Styled from "@/styles/Product.styled";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { useProductContext } from "@/context";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { formatPrice } from "@/packages/utils";
import { useMobileBreakpoint } from "@/components/breakpoints";

export default function ProductDetail({ product }) {
  const isMobile = useMobileBreakpoint();

  const { qty, setQty, incrementQty, decrementQty, onAddToCart } =
    useProductContext();

  useEffect(() => {
    setQty(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { title, price, description, image_url } = product;
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
        <img src={image_url} alt={title} />
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
}
