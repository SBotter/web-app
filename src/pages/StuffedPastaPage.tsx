import { Heading, VStack, Text, Flex } from "@chakra-ui/react";
import Footer from "../components/Footer";
import ProductList from "../components/ProductList";

const StuffedPastaPage = () => {
  return (
    <>
      <VStack>
        <Heading marginTop={10} marginBottom={10}>
          <Text
            color="base.700"
            fontSize={{ base: "30px", md: "50px", lg: "80px" }}
            align="center"
          >
            Unwrap Culinary Excellence: Discover the Elegance of Handcrafted
            Stuffed Pasta - Ravioli, Tortellini, Cappelletti Magic Awaits in
            Every Bite!
          </Text>
        </Heading>
        <Text
          color="base.700"
          fontSize={{ base: "15px", md: "25px", lg: "40px" }}
          align="center"
          p={5}
        >
          Savor the excellence of our stuffed pasta collection, from the
          artfully folded Ravioli revealing a symphony of flavors to the
          bite-sized wonders of Tortellini, and the charmingly folded
          Cappelletti each crafted with precision and filled with love,
          promising a delectable journey in every bite.
        </Text>
        <Flex width="100%" justify="center">
          <ProductList filterValue="stuffedpasta" />
        </Flex>
      </VStack>
      <Footer />
    </>
  );
};

export default StuffedPastaPage;
