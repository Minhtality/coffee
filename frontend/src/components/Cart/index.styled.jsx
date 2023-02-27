import styled from "styled-components";

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
   ${({ isOpen }) => isOpen ? 'display: flex' : 'display: none'}
`
export const CartSummary = styled.div`
    text-align: center;
    margin: 0 auto;
    margin-bottom: 2rem;
`

export const CartContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 30%;
    height: 100%;
    background-color: white;
    padding: 2rem 5rem;
    position: relative;
    overflow-y: scroll;
`