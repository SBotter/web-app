import { Link as RouterLink } from "react-router-dom";
import Footer from "../components/Footer";
import { Heading, VStack, Text, Button } from "@chakra-ui/react";
import { FaWhatsapp } from "react-icons/fa";

const OrderSucess = () => {
  return (
    <>
      <VStack>
        <Heading marginTop={10} marginBottom={5} p={5}>
          <Text
            color="base.700"
            fontSize={{ base: "20px", md: "30px", lg: "40px" }}
            align="center"
          >
            Order confirmed! Thank you!
          </Text>
        </Heading>
        <Text
          color="base.700"
          fontSize={{ base: "12px", md: "20px", lg: "30px" }}
          align="center"
          p={5}
        >
          Thank you for your order! We want to inform you that we have received
          it and are currently in the process of handling and fulfilling your
          request. Feel free to reach out to us at any time for additional
          information or assistance. Expect a contact from us soon to confirm
          and finalize the payment method for your order. We appreciate your
          business!
        </Text>
        <Button
          as={RouterLink} // Use the Link component from react-router-dom
          to={"/contact"}
          leftIcon={<FaWhatsapp size="1.3em" />}
          colorScheme="base"
          variant="solid"
        >
          Contact us
        </Button>
      </VStack>

      <Footer />
    </>
  );
};

export default OrderSucess;
