import Link from "next/link";
import React from "react";
import { FiShoppingBag } from "react-icons/fi";
import * as Styled from "./index.styled";
import { useProductContext } from "@/context";
import Cart from "../Cart";
import User from "../User";
import { AnimatePresence, motion } from "framer-motion";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Nav() {
  const { cartItems, setShowCart, showCart } = useProductContext();
  const { user, error, isLoading } = useUser();

  const totalQuantity = cartItems.reduce((acc, curr) => {
    return acc + curr.quantity;
  }, 0);

  return (
    <Styled.NavWrapper>
      <Link href="/">Good Soup.</Link>
      <Styled.NavItems>
        <Styled.Item onClick={() => setShowCart(true)}>
          <FiShoppingBag />
          <h3>Cart</h3>
          {cartItems.length > 0 && (
            <motion.span animate={{ scale: 1 }} initial={{ scale: 0 }}>
              {totalQuantity}
            </motion.span>
          )}
        </Styled.Item>
        <User />
        {/* <div>
          <FiShoppingBag />
          <h3>Cart</h3>
        </div> */}
      </Styled.NavItems>
      <AnimatePresence>
        {showCart && <Cart cartItems={cartItems} />}
      </AnimatePresence>
    </Styled.NavWrapper>
  );
}
