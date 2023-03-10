import styled from "styled-components";
import breakpoint from "@/components/breakpoints";
import { motion } from "framer-motion";

export const CartWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 100;
  display: flex;
  justify-content: flex-end;
`;
export const CartSummary = styled.h3`
  text-align: center;
  margin: 0 auto;
  margin: 2rem 0;
  font-size: 1.5rem;
`;
export const EmptyCart = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  font-size: 2rem;

  svg {
    width: 150px;
    height: 150px;
    color: rgba(0, 0, 0, 0.7);
  }
`;

export const CartContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 100%;
  background-color: #f1f1f1;
  padding: 2rem;
  position: relative;
  overflow-y: auto;
  ${breakpoint("tablet")} {
    width: 50%;
  }
  ${breakpoint("mobile")} {
    width: 100%;
  }
`;

export const CartItem = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(233, 228, 219);
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 10px;
  img {
    min-width: 100px;
    width: 100px;
    height: 100px;
    min-height: 100px;
    object-fit: cover;
  }
`;

export const CartItemDetails = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;
export const ItemName = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
`;

export const QuantityContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 20px;
    height: 20px;
    color: #494949;
    margin: 0 1rem;
  }
`;

export const Quantity = styled(motion.div)`
  width: 30px;
  height: 30px;
  margin: 0 10px;
  text-align: center;
`;
export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  left: 10px;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  svg {
    width: 20px;
    height: 20px;
  }
`;

export const ButtonStyle = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  svg {
    width: 20px;
    height: 20px;
  }
`;

export const PriceInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  min-width: 4rem;
  align-items: center;
`;

export const CheckoutContainer = styled(motion.div)`
  position: relative;
`;

export const TotalPrice = styled.p`
  font-size: 1rem;
  margin: 1rem 0;
  text-align: left;
`;

export const CheckoutButton = styled.button`
  background: var(--primary);
  color: white;
  width: 100%;
  font-weight: 500;
  padding: 0.5rem 1rem;
  font-size: 1.5rem;
  cursor: pointer;
`;

export const AnimatedCards = styled(motion.div)``;
