import styled from "styled-components";
import { motion } from "framer-motion";
import breakpoint from "@/components/breakpoints";

export const Gallery = styled(motion.div)`
  display: grid;
  grid-gap: 1.5rem;
  margin-bottom: 50px;
  ${breakpoint("desktop", "up")} {
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  }
`;
