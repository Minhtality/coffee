"use client";

import { useContext, createContext, useState } from "react";

const ProductContext = createContext();

export const ContextState = ({ children }) => {
  const [qty, setQty] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const incrementQty = () => setQty((prevState) => prevState + 1);
  const decrementQty = () =>
    setQty((prevState) => {
      if (prevState - 1 < 1) return 1;
      return prevState - 1;
    });

  const onAddToCart = (product, quantity) => {
    const existingProduct = cartItems.find(
      (item) => item.slug === product.slug
    );
    if (existingProduct) {
      setCartItems(
        cartItems.map((item) =>
          item.slug === product.slug
            ? {
                ...existingProduct,
                quantity: existingProduct.quantity + quantity,
              }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: quantity }]);
    }
  };

  const removeFromCart = (slug) => {
    setCartItems(cartItems.filter((item) => item.slug !== slug));
  };

  const handleItemQuantity = (slug, action) => {
    const existingProduct = cartItems.find((item) => item.slug === slug);
    if (action === "increase") {
      setCartItems(
        cartItems.map((item) =>
          item.slug === slug
            ? {
                ...existingProduct,
                quantity: existingProduct.quantity + 1,
              }
            : item
        )
      );
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.slug === slug
            ? {
                ...existingProduct,
                quantity:
                  existingProduct.quantity - 1 < 1
                    ? 1
                    : existingProduct.quantity - 1,
              }
            : item
        )
      );
    }
  };

  return (
    <ProductContext.Provider
      value={{
        qty,
        setQty,
        incrementQty,
        decrementQty,
        showCart,
        setShowCart,
        cartItems,
        onAddToCart,
        removeFromCart,
        handleItemQuantity,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);
// End of Product Context
