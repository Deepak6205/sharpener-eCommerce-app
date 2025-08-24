import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [cartElm, setCartElm] = useState([]);
  const { user } = useAuth();

  const API_BASE =
    "https://crudcrud.com/api/5058c0e09627445a87a3b27e617da00a/cart";

  // ✅ Fetch cart on mount or when user changes
  useEffect(() => {
    const fetchCart = async () => {
      if (!user?.email) return;
      try {
        const res = await fetch(API_BASE);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();

        const userCart = data.filter((item) => item.userEmail === user.email);
        setCartElm(userCart || []);
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };
    fetchCart();
  }, [user]);

  // ✅ Add product
  const handleAddProduct = async (product) => {
    if (!user?.email) return;

    const productWithUser = { ...product, userEmail: user.email };
    try {
      const res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productWithUser),
      });

      const savedProduct = await res.json(); // get product with _id
      setCartElm((prev) => [...prev, savedProduct]);
    } catch (err) {
      console.error("Error adding product to backend:", err);
    }
  };

  // ✅ Remove product using _id
  const handleRemove = async (_id) => {
    if (!user?.email || !_id) return;

    try {
      await fetch(`${API_BASE}/${_id}`, {
        method: "DELETE",
      });

      // update frontend immediately
      const updatedCart = cartElm.filter((item) => item._id !== _id);
      setCartElm(updatedCart);
    } catch (err) {
      console.error("Error removing product from backend:", err);
    }
  };

  return (
    <ProductContext.Provider value={{ cartElm, handleAddProduct, handleRemove }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
