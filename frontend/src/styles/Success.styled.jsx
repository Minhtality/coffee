import styled from "styled-components";
import { motion } from "framer-motion";
import breakpoint from "@/components/breakpoints";

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

  h2,
  h3 {
    margin-bottom: 1rem;
  }
  img {
    margin-top: 1rem;
  }

  ${breakpoint("mobile")} {
    width: 100%;
    padding: 1rem;

    img {
      width: 100%;
      height: 100%;
    }
  }
`;

export const OrderInformation = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  width: 100%;
`;

export const Card = styled.div`
  font-size: 1rem;
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
