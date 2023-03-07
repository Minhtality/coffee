import styled from "styled-components";
import { motion } from "framer-motion";

export const SuccessContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 70%;
  background-color: #fff;
  border-radius: 20px;
  margin-bottom: 1rem;
  text-align: center;
  padding: 3rem;
`;

export const OrderInformation = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: left;
  width: 100%;
`;
export const Back = styled.button`
  background: var(--primary);
  color: white;
  width: 100%;
  font-weight: 500;
  padding: 1rem 2rem;
  cursor: pointer;
  width: 200px;
  margin: 1rem auto;
`;

export const Card = styled.div`
  margin: 1rem;
  padding: 1rem;
  font-size: 1rem;
  h4 {
    margin-bottom: 1rem;
  }
`;

export const LineItem = styled.div`
  margin: 1rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 5px;

  p {
    margin: 0;
  }
`;
