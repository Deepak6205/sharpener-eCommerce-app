import { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({children}) =>{
  const [cartElm, setCartElm] = useState([]);
  const handleRemove = (index) => {
    const updatedCart = cartElm.filter((_, i) => i !== index);
    setCartElm(updatedCart);
  };

  const handleAddProduct = (product) =>{
    setCartElm([...cartElm,product])
  }

    return(
        <ProductContext value={{cartElm,handleAddProduct,handleRemove}}>
            {children}
        </ProductContext>
    )
}
// eslint-disable-next-line react-refresh/only-export-components
export const useProduct = () => useContext(ProductContext);