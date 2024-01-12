import { Heading, VStack, Text, Flex } from "@chakra-ui/react";
import Footer from "../components/Footer";
import ProductList from "../components/ProductList";

const CannelloniPage = () => {
  return (
    <>
      <VStack>
        <Heading marginTop={10} marginBottom={10}>
          <Text
            color="base.700"
            fontSize={{ base: "30px", md: "50px", lg: "80px" }}
            align="center"
          >
            Culinary Craftsmanship: Handmade Cannelloni Elegance.
          </Text>
        </Heading>
        <Text
          color="base.700"
          fontSize={{ base: "15px", md: "25px", lg: "40px" }}
          align="center"
        >
          Discover the artistry in every bite with our handmade cannelloni,
          where tender pasta tubes embrace a medley of rich fillings, promising
          a culinary journey that harmonizes flavors and textures to perfection.
        </Text>
        <Flex width="100%" justify="center">
          <ProductList filterValue="canneloni" />
        </Flex>
      </VStack>
      <Footer />
    </>
  );
};

export default CannelloniPage;
