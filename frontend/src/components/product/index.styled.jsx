import styled from "styled-components";
import Link from "next/link";
import { motion } from "framer-motion";

export const Product = styled(motion(Link))``;

export const ProductWrapper = styled.div`
  background-color: white;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  cursor: pointer;
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

export const ImageWrapper = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ProductInfo = styled.div`
  margin-top: 1rem;
`;
