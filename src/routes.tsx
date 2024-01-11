import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";

import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import ContactPage from "./pages/ContactPage";
import HeroPage from "./pages/HeroPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "products", element: <HeroPage /> },
      { path: "contact", element: <ContactPage /> },
    ],
  },
]);

export default router;