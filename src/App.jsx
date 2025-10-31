import React, { useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Store from "./components/Store";
import Cart from "./components/Cart";
import { ProductProvider } from "./components/context/Context";
import FetchMovie from "./components/movie/Movie";
import Contact from "./components/Contact";
import ProductDetails from "./components/ProductDetails";
import Login from "./components/authentication/Login";
import Signup from "./components/authentication/Signup";
import { AuthProvider, useAuth } from "./components/context/AuthContext";
import ChangePassword from "./components/authentication/ChangePassword";

const AppRoutes = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user, loading } = useAuth(); 

  if (loading) {
    return <div>Loading...</div>;
  }

  const PrivateRoute = ({ element }) => {
    return user ? element : <Navigate to="/login" />;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: user ? (
        <div>
          <Navbar onCartClick={() => setIsCartOpen(true)} />
          <Home />
        </div>
      ) : (
        <Navigate to="/login" />
      ),
    },
    {
      path: "about",
      element: (
        <PrivateRoute
          element={
            <div>
              <Navbar onCartClick={() => setIsCartOpen(true)} />
              <About />
            </div>
          }
        />
      ),
    },
    {
      path: "contact",
      element: (
        <PrivateRoute
          element={
            <div>
              <Navbar onCartClick={() => setIsCartOpen(true)} />
              <Contact />
            </div>
          }
        />
      ),
    },
    {
      path: "store",
      element: (
        <PrivateRoute
          element={
            <div>
              <Navbar onCartClick={() => setIsCartOpen(true)} />
              <Store />
              {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />}
            </div>
          }
        />
      ),
    },
    {
      path: "store/:id",
      element: (
        <PrivateRoute
          element={
            <div>
              <Navbar onCartClick={() => setIsCartOpen(true)} />
              <ProductDetails onCartClick={() => setIsCartOpen(true)} />
              {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />}
            </div>
          }
        />
      ),
    },
    {
      path: "change-password",
      element: (
        <PrivateRoute
          element={
            <div>
              <Navbar onCartClick={() => setIsCartOpen(true)} />
              <ChangePassword />
            </div>
          }
        />
      ),
    },
    {
      path: "movie",
      element: (
        <PrivateRoute
          element={
            <div>
              <Navbar onCartClick={() => setIsCartOpen(true)} />
              <FetchMovie />
            </div>
          }
        />
      ),
    },
    { path: "login", element: <Login /> },
    { path: "signup", element: <Signup /> },
  ]);

  return <RouterProvider router={router} />;
};

const App = () => {
  return (
    <AuthProvider>
      <ProductProvider>
        <AppRoutes />
      </ProductProvider>
    </AuthProvider>
  );
};

export default App;
