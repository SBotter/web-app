import { Heading, VStack, Text, Flex } from "@chakra-ui/react";
import Footer from "../components/Footer";
import ProductList from "../components/ProductList";

const FocacciaPage = () => {
  return (
    <>
      <VStack>
        <Heading marginTop={10} marginBottom={10} p={5}>
          <Text
            color="base.700"
            fontSize={{ base: "30px", md: "50px", lg: "80px" }}
            align="center"
          >
            Golden Bliss: Artisanal Focaccia Crafted to Perfection.
          </Text>
        </Heading>
        <Text
          color="base.700"
          fontSize={{ base: "15px", md: "25px", lg: "40px" }}
          align="center"
          p={5}
        >
          Elevate your senses with our handmade focaccias, where aromatic
          rosemary, succulent confit tomatoes, delicate fleur de sel, and
          premium olive oil converge to create a taste symphony that transforms
          each bite into a culinary masterpiece.
        </Text>
        <Flex width="100%" justify="center">
          <ProductList filterValue="focaccia" />
        </Flex>
      </VStack>
      <Footer />
    </>
  );
};

export default FocacciaPage;
