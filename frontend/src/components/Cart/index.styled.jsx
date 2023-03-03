import styled from "styled-components";
import breakpoint from "@/components/breakpoints";

export const CartWrapper = styled.div`
  position: fixed;
  display: flex;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100vh;
  right: 0;
  top: 0;
  z-index: 100;
  ${({ isOpen }) => (isOpen ? "display: flex" : "display: none")}
`;
export const CartSummary = styled.h3`
  text-align: center;
  margin: 0 auto;
  margin-bottom: 2rem;
  font-size: 2rem;
`;
export const EmptyCart = styled.div`
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

export const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 100%;
  background-color: #f1f1f1;
  padding: 2rem 3rem;
  position: relative;
  overflow-y: scroll;
  ${breakpoint("tablet", "down")} {
    width: 100%;
  }
`;

export const CartItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(233, 228, 219);
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 10px;
  img {
    margin-right: 2rem;
    width: 100px;
    height: 100px;
    object-fit: cover;
  }
`;

export const CartItemDetails = styled.div`
  display: flex;
  flex-direction: column;
`;
export const ItemName = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
`;

export const QuantityContainer = styled.div`
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

export const Quantity = styled.div`
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

export const PriceInfo = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 4rem;
  align-items: center;
`;
