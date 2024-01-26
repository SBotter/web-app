import { Box } from "@chakra-ui/react";

import Footer from "../components/Footer";
import FormCheckout from "../components/FormCheckout";

const CheckoutPage = () => {
  return (
    <>
      <Box width={"100%"} p={5}>
        <Box bg="base.200" borderRadius={20} width="100%" padding={4}>
          <FormCheckout />
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default CheckoutPage;
