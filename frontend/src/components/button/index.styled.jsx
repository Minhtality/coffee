import styled, { css } from "styled-components";
import Link from "next/link";

const ButtonStyle = css`
  background: var(--primary);
  color: white;
  font-weight: 500;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  border: none;
  margin: 0;
  font-family: inherit;
`;

export const a = styled(Link)`
  ${ButtonStyle}
`;

export const Button = styled.button`
  ${ButtonStyle}
`;
