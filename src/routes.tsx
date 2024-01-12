import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import ContactPage from "./pages/ContactPage";
import ProductsPage from "./pages/ProductsPage";
import StuffedPastaPage from "./pages/stuffedPastaPage";
import FocacciaPage from "./pages/FocacciaPage";
import PastaSeccaPage from "./pages/PastaSeccaPage";
import LasagnaPage from "./pages/LasagnaPage";
import SaucePage from "./pages/SaucePage";
import CannelloniPage from "./pages/cannelloniPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/products", element: <ProductsPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/products/stuffedpasta", element: <StuffedPastaPage /> },
      { path: "/products/pastasecca", element: <PastaSeccaPage /> },
      { path: "/products/focaccia", element: <FocacciaPage /> },
      { path: "/products/lasagna", element: <LasagnaPage /> },
      { path: "/products/sauce", element: <SaucePage /> },
      { path: "/products/canneloni", element: <CannelloniPage /> },
    ],
  },
]);

export default router;
