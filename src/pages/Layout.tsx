import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import NavBar from "../components/Navbar";

const Layout = () => {
  return (
    <>
      <NavBar />
      <Box padding={2} bg="base.50">
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
