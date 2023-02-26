import styled from "styled-components";

export const NavWrapper = styled.div`
  display: flex;
  min-height: 15vh;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  a {
    font-size: 1.2rem;
    font-weight: 600;
  }
`;

export const NavItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  h3 {
    font-size: 1rem;
    padding: 0.25rem;
  }

  svg {
    font-size: 1.25rem;
  }
`;

export const Item = styled.div`
  margin-left: 3rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

export const ItemQty = styled.div`
  position: absolute;
  top: -5px;
  right: 2px;
  border-radius: 100%;
  border: 1px solid #f05644;
  width: 15px;
  height: 15px;
  display: flex;
  justify-content: center;
  font-size: 0.6rem;
  color: white;
  background-color: #f05644;
`;
