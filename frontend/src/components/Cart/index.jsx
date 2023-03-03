import * as Styled from "./index.styled";
import { useRef, useEffect } from "react";
import { useProductContext } from "@/context";
import { MdOutlineCoffeeMaker } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import {
  AiOutlineClose,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import { formatPrice } from "@/packages/utils/";
import { AnimatePresence } from "framer-motion";

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
};
const cardsContainerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};
const Cart = ({ cartItems }) => {
  const { removeFromCart, showCart, setShowCart, handleItemQuantity } =
    useProductContext();
  const cartWrapperRef = useRef(null);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setShowCart(false);
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const handleClick = (e) => {
    if (e.target === cartWrapperRef.current) {
      setShowCart(false);
    }
  };

  const hasCartItem = cartItems.length > 0;
  const subTotal = cartItems.reduce((acc, curr) => {
    return acc + curr.price * curr.quantity;
  }, 0);

  return (
    <Styled.CartWrapper
      ref={cartWrapperRef}
      onClick={handleClick}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
    >
      <Styled.CartContainer
        initial={{ x: "50%" }}
        animate={{ x: "0%" }}
        transition={{ type: "tween" }}
        exit={{ x: "50%" }}
      >
        <Styled.CloseButton onClick={() => setShowCart(false)}>
          <AiOutlineClose />
        </Styled.CloseButton>
        {hasCartItem ? (
          <Styled.CartSummary>Order Summary</Styled.CartSummary>
        ) : (
          <Styled.EmptyCart>
            No coffee?
            <MdOutlineCoffeeMaker />
          </Styled.EmptyCart>
        )}
        <Styled.AnimatedCards
          variants={cardsContainerVariants}
          initial="hidden"
          animate="show"
        >
          {cartItems?.map((item) => {
            const itemImage = item.image.data.attributes.formats.small.url;
            const itemTotal = item.price * item.quantity;
            return (
              <Styled.CartItem
                key={item.title}
                variants={cardVariants}
                transition={{ duration: 0.6 }}
              >
                <img src={itemImage} alt={item.title} />
                <Styled.CartItemDetails>
                  <Styled.ItemName>{item.title}</Styled.ItemName>
                  <Styled.QuantityContainer>
                    <Styled.ButtonStyle
                      onClick={() => handleItemQuantity(item.slug, "decrease")}
                    >
                      <AiFillMinusCircle />
                    </Styled.ButtonStyle>
                    <p>{item.quantity}</p>
                    <Styled.ButtonStyle
                      onClick={() => handleItemQuantity(item.slug, "increase")}
                    >
                      <AiFillPlusCircle />
                    </Styled.ButtonStyle>
                  </Styled.QuantityContainer>
                </Styled.CartItemDetails>
                <Styled.PriceInfo>
                  <Styled.ButtonStyle onClick={() => removeFromCart(item.slug)}>
                    <BsTrash />
                  </Styled.ButtonStyle>
                  <p>{formatPrice(itemTotal)}</p>
                </Styled.PriceInfo>
              </Styled.CartItem>
            );
          })}
        </Styled.AnimatedCards>
        {hasCartItem && (
          <>
            <Styled.TotalPrice>
              Subtotal: {formatPrice(subTotal)}
            </Styled.TotalPrice>

            <Styled.Checkout
              onClick={() => console.log("cart Items", cartItems)}
            >
              Check Out
            </Styled.Checkout>
          </>
        )}
      </Styled.CartContainer>
    </Styled.CartWrapper>
  );
};

export default Cart;
