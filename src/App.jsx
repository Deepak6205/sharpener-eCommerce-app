import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Store from "./components/Store";
import Cart from "./components/Cart";
import { ProductProvider } from "./components/context/Context";

const App = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <Navbar onCartClick={() => setIsCartOpen(true)} />
          <Home />
        </div>
      ),
    },
    {
      path: "about",
      element: (
        <div>
          <Navbar onCartClick={() => setIsCartOpen(true)} />
          <About />
        </div>
      ),
    },
    {
      path: "store",
      element: (
        <div>
          <Navbar onCartClick={() => setIsCartOpen(true)} />
          <Store />
          {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />}
        </div>
      ),
    },
  ]);

  return (
    <ProductProvider>
      <RouterProvider router={router} />
    </ProductProvider>
    // <div>
    //   <RouterProvider router={router} />
    // </div>
  );
};

export default App;

