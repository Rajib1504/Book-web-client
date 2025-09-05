import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Product from "../Pages/Product";
import PricingPage from "../Pages/Pricing/PricingPage";
import AboutPage from "../Pages/About/AboutPage";
import Layout from "../Pages/library/Layout";
import LibraryHome from './../components/Library/components/LibraryHome';
import Popular from "../components/Library/components/Popular";
import ProductRequests from "../components/Library/components/ProductRequests";
import Saved from "../components/Library/components/Saved";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/products",
        element: <Product />,
      },
      {
        path: "/pricing",
        element: <PricingPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
    ],
  },
  {
    path: "/library",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <LibraryHome />
      },{
        path: "/library/popular",
        element: <Popular />
      },{
        path: "/library/product-requests",
        element: <ProductRequests />
      },{
        path: "/library/saved",
        element: <Saved />
      }
    ],
  }
]);
