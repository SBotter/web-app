import { Heading, VStack, Text, Flex } from "@chakra-ui/react";
import Footer from "../components/Footer";
import ProductList from "../components/ProductList";
import FilterProducts from "../components/FilterProducts";

const BreadPage = () => {
  return (
    <>
      <VStack>
        <Heading marginTop={10} marginBottom={10} p={5}>
          <Text
            color="base.700"
            fontSize={{ base: "30px", md: "50px", lg: "80px" }}
            align="center"
          >
            Discover a tantalizing array of freshly baked breads, crafted with
            care and expertise to elevate your every mealtime moment.
          </Text>
        </Heading>
        <Text
          color="base.700"
          fontSize={{ base: "15px", md: "25px", lg: "40px" }}
          align="center"
          p={5}
        >
          Experience the culinary artistry in every slice with our selection of
          handmade bread, where each loaf embodies the meticulous craftsmanship
          and dedication to quality ingredients, ensuring a harmonious blend of
          flavors and textures that will elevate your dining experience to new
          heights.
        </Text>
        <Flex width="100%" justify="center">
          <ProductList filterValue="bread" />
        </Flex>
      </VStack>
      <Flex justifyContent={"center"}>
        <FilterProducts />
      </Flex>
      <Footer />
    </>
  );
};

export default BreadPage;
