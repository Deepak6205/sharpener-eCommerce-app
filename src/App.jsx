import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Store from "./components/Store";
import Cart from "./components/Cart";

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
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;

// export default App;

// import React, { useState, useEffect } from "react";
// import { createBrowserRouter, RouterProvider, useLocation } from "react-router-dom";
// import Home from "./components/Home";
// import Navbar from "./components/Navbar";
// import About from "./components/About";
// import Store from "./components/Store";
// import Cart from "./components/Cart";

// const AppLayout = ({ children }) => {
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const location = useLocation();
//   useEffect(() => {
//     if (location.pathname !== "/store") {
//       setIsCartOpen(false);
//     }
//   }, [location]);

//   return (
//     <div>
//       <Navbar onCartClick={() => setIsCartOpen(true)} />
//       {children}
//       {location.pathname === "/store" && isCartOpen && (
//         <Cart onClose={() => setIsCartOpen(false)} />
//       )}
//     </div>
//   );
// };

// const App = () => {
//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: (
//         <AppLayout>
//           <Home />
//         </AppLayout>
//       ),
//     },
//     {
//       path: "about",
//       element: (
//         <AppLayout>
//           <About />
//         </AppLayout>
//       ),
//     },
//     {
//       path: "store",
//       element: (
//         <AppLayout>
//           <Store />
//         </AppLayout>
//       ),
//     },
//   ]);

//   return <RouterProvider router={router} />;
// };

// export default App;
