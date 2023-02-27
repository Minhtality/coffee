import Link from "next/link";
import { FiShoppingBag } from "react-icons/fi";
import * as Styled from "./index.styled";
import { useProductContext } from "@/context";
import Cart from "../Cart";

export default function Nav() {
  const { cartItems, setShowCart } = useProductContext();

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
            <Styled.ItemQty>{totalQuantity}</Styled.ItemQty>
          )}
        </Styled.Item>
        {/* <div>
          <FiShoppingBag />
          <h3>Cart</h3>
        </div> */}
      </Styled.NavItems>
      <Cart cartItems={cartItems} />
    </Styled.NavWrapper>
  );
}
// add cart summary, when clicking on the cart icon, show the cart summary and calculate the total price
// build out cards for each product
// add button to remove item from cart, add button to increase/decrease quantity
// add button to checkout -> redirect to checkout page
