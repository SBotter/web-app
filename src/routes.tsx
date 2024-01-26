import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import ContactPage from "./pages/ContactPage";
import ProductsPage from "./pages/ProductsPage";
import StuffedPastaPage from "./pages/StuffedPastaPage";
import FocacciaPage from "./pages/FocacciaPage";
import PastaSeccaPage from "./pages/PastaSeccaPage";
import LasagnaPage from "./pages/LasagnaPage";
import SaucePage from "./pages/SaucePage";
import CannelloniPage from "./pages/CannelloniPage";
import DetailsPage from "./pages/DetailsPage";
import DeliveryPage from "./pages/DeliveryPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSucess from "./pages/OrderSucess";

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
      { path: "/products/detail/:filterValue", element: <DetailsPage /> },
      { path: "/delivery", element: <DeliveryPage /> },
      { path: "/checkout", element: <CheckoutPage /> },
      { path: "/order-success", element: <OrderSucess /> },
    ],
  },
]);

export default router;
