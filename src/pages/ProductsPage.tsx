import { Heading, VStack, Text, Flex, Box } from "@chakra-ui/react";
import FilterProducts from "../components/FilterProducts";
import Footer from "../components/Footer";
import ProductList from "../components/ProductList";

const ProductsPage = () => {
  return (
    <>
      <VStack>
        <Heading marginTop={10} marginBottom={10} p={5}>
          <Text
            color="base.700"
            fontSize={{ base: "30px", md: "50px", lg: "80px" }}
            align="center"
          >
            Savor Italy's authentic flavors in every bite of our exquisite
            handmade pasta collection.
          </Text>
        </Heading>
        <Text
          color="base.700"
          fontSize={{ base: "15px", md: "25px", lg: "40px" }}
          align="center"
          p={5}
        >
          Transform meals into gourmet experiences with our exceptional
          handcrafted delights stuffed raviolis, lasagna layers, signature
          sauces, artisanal focaccias, silky fettuccini, and classic spaghetti,
          creating a symphony of flavors.
        </Text>
        <Box width="100%">
          <FilterProducts />
        </Box>
        <Flex width="100%" justify="center">
          <ProductList filterValue="" />
        </Flex>
      </VStack>
      <Footer />
    </>
  );
};

export default ProductsPage;
