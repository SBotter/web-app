import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Header from "../components/Header";
import { ScrollRestoration } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <ScrollRestoration />
      <Header />
      <Box bg="base.50">
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
