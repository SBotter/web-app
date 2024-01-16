import { Heading, VStack, Text, Flex } from "@chakra-ui/react";
import Footer from "../components/Footer";
import ProductList from "../components/ProductList";

const SaucePage = () => {
  return (
    <>
      <VStack>
        <Heading marginTop={10} marginBottom={10}>
          <Text
            color="base.700"
            fontSize={{ base: "30px", md: "50px", lg: "80px" }}
            align="center"
          >
            Elevate your dishes with our trio of exquisite sauces: Classic
            Tomato for richness, Béchamel for creaminess, and Butter Sage for a
            touch of elegance.
          </Text>
        </Heading>
        <Text
          color="base.700"
          fontSize={{ base: "15px", md: "25px", lg: "40px" }}
          align="center"
          p={5}
        >
          Discover our trio of exquisite sauces – Classic Tomato for a taste of
          Italy's sun-ripened richness, Béchamel for creamy indulgence, and
          Butter Sage for a fragrant touch of elegance. Elevate your dishes with
          our carefully crafted sauces, each adding its own unique charm to your
          culinary creations.
        </Text>
        <Flex width="100%" justify="center">
          <ProductList filterValue="sauce" />
        </Flex>
      </VStack>
      <Footer />
    </>
  );
};

export default SaucePage;
