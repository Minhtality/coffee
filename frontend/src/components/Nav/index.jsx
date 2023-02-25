import Link from "next/link";
import { FiShoppingBag } from "react-icons/fi";
import * as Styled from "./index.styled";

export default function Nav() {
  return (
    <Styled.NavWrapper>
      <Link href="/">Good Soup.</Link>
      <Styled.NavItems>
        <div>
          <FiShoppingBag />
          <h3>Cart</h3>
        </div>
        {/* <div>
          <FiShoppingBag />
          <h3>Cart</h3>
        </div> */}
      </Styled.NavItems>
    </Styled.NavWrapper>
  );
}
