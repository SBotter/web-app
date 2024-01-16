import { Heading, Text, Flex, VStack } from "@chakra-ui/react";
import Footer from "../components/Footer";
import Map from "../components/Map";

const DeliveryPage = () => {
  return (
    <>
      <VStack>
        <Heading marginTop={10} marginBottom={10} p={5}>
          <Text
            color="base.700"
            fontSize={{ base: "30px", md: "50px", lg: "80px" }}
            align="center"
          >
            WE DELIVER!
          </Text>
        </Heading>
        <Text
          color="base.700"
          fontSize={{ base: "15px", md: "25px", lg: "40px" }}
          align="center"
          p={5}
        >
          Experience the convenience of culinary delight at your doorstep with
          our delivery service bringing the flavors of artisanal excellence
          straight to you, ensuring every bite is a journey of freshness and
          satisfaction.
        </Text>
        <Flex width="100%" justify="center">
          <Map />
        </Flex>
      </VStack>
      <Footer />
    </>
  );
};

export default DeliveryPage;
