import styled from "styled-components";
import breakpoint from "@/components/breakpoints";

export const ProductDetails = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 5rem;
  margin-bottom: 5rem;

  ${breakpoint("tablet", "down")} {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 0;
  }
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

export const ImageWrapper = styled.div`
  margin-bottom: 1rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  ${breakpoint("tablet", "down")} {
    width: 100%;
    height: 300px;
  }
`;

export const Details = styled.div`
  width: 40%;
  button {
    font-size: 1.5rem;
    font-weight: medium;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }
  ${breakpoint("tablet", "down")} {
    width: 100%;
  }
`;

export const Quantity = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
  button {
    background: none;
    border: none;
    display: flex;
    font-size: 1.5rem;
  }
  p {
    width: 1rem;
    text-align: center;
  }

  span {
    color: var(--secondary);
  }

  svg {
    color: #494949;
  }
`;

export const Buy = styled.button`
  background: var(--primary);
  color: white;
  width: 100%;
  font-weight: 500;
`;
