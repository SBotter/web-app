import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Header from "../components/Header";

const Layout = () => {
  return (
    <>
      <Header />
      <Box bg="base.50">
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
