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
    background-color: #f1f1f1;
    padding: 2rem 5rem;
    position: relative;
    overflow-y: scroll;
`

export const CartItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: white;
    margin-bottom: 1rem;
    padding: 1rem;
    border-radius: 10px;
    img {
        width: 100px;
        height: 100px;
        object-fit: cover;
    }
`

export const CartItemDetails = styled.div`
    width: 70%;
    button {
        margin: 0 0.5rem;
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 5px;
        background-color: #b3b3b3;
        color: white;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
    }
`