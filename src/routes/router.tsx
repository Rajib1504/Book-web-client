import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Product from "../Pages/Product";
import PricingPage from "../Pages/Pricing/PricingPage";
import AboutPage from "../Pages/About/AboutPage";
import Layout from "../Pages/library/Layout";
import LibraryHome from "./../components/Library/components/LibraryHome";
import Popular from "../components/Library/components/Popular";
import Saved from "../components/Library/components/Saved";
import ProductDetailsPage from "../Pages/library/ProductDetailsPage";
import SpecialDeals from "../components/Library/components/SpecialDeals";
import BookCoverTemplates from "../components/Library/components/BookCoverTemplates";
import Account from "../components/Library/components/Account";
import DigitalProducts from "../components/Library/components/DigitalProducts";

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
        element: <LibraryHome />,
      },
      {
        path: "/library/product/:id",
        element: <ProductDetailsPage />,
      },
      {
        path: "/library/popular",
        element: <Popular />,
      },
      {
        path: "/library/digital-products",
        element: <DigitalProducts />,
      },

      {
        path: "/library/book-cover-templates",
        element: <BookCoverTemplates />,
      },
      {
        path: "/library/saved",
        element: <Saved />,
      },
      {
        path: "/library/special-deals",
        element: <SpecialDeals />,
      },
      {
        path: "/library/account",
        element: <Account />,
      },
    ],
  },
]);
