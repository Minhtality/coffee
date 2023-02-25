import { useContext, createContext, useState } from "react";

const ProductContext = createContext();

export const ContextState = ({ children }) => {
  const [qty, setQty] = useState(1);

  const incrementQty = () => setQty((prevState) => prevState + 1);
  const decrementQty = () => setQty((prevState) => prevState - 1);

  return (
    <ProductContext.Provider value={{ qty, incrementQty, decrementQty }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);
// End of Product Context
