import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import "bootstrap/dist/css/bootstrap.css";
import { Analytics } from "@vercel/analytics/react";
import { CartContextProvider } from "./components/CartContext";

import theme from "./theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <CartContextProvider>
        <RouterProvider router={router} />
      </CartContextProvider>
    </ChakraProvider>
    <Analytics />
  </React.StrictMode>
);
