import Link from "next/link";
import { FiShoppingBag } from "react-icons/fi";
import * as Styled from "./index.styled";
import { useProductContext } from "@/context";

export default function Nav() {
  const { cartItems } = useProductContext();
  console.log(cartItems);

  const totalQuantity = cartItems.reduce((acc, curr) => {
    return acc + curr.quantity;
  }, 0);

  return (
    <Styled.NavWrapper>
      <Link href="/">Good Soup.</Link>
      <Styled.NavItems>
        <Styled.Item>
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
    </Styled.NavWrapper>
  );
}
