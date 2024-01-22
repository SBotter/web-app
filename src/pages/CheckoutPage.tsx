import { Box } from "@chakra-ui/react";

import Footer from "../components/Footer";
import FormCheckout from "../components/FormCheckout";

const CheckoutPage = () => {
  return (
    <>
      <Box bg="base.200" borderRadius={20} width="100%" padding={4}>
        <FormCheckout />
      </Box>
      <Footer />
    </>
  );
};

export default CheckoutPage;
