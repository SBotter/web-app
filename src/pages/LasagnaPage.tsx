import { Heading, VStack, Text, Flex } from "@chakra-ui/react";
import Footer from "../components/Footer";
import ProductList from "../components/ProductList";

const LasagnaPage = () => {
  return (
    <>
      <VStack>
        <Heading marginTop={10} marginBottom={10}>
          <Text
            color="base.700"
            fontSize={{ base: "30px", md: "50px", lg: "80px" }}
            align="center"
          >
            Luscious Layers: Handmade Lasagna Perfection.
          </Text>
        </Heading>
        <Text
          color="base.700"
          fontSize={{ base: "15px", md: "25px", lg: "40px" }}
          align="center"
        >
          Dive into the sumptuous world of handmade lasagnas on our webapp,
          where layers of artisanal pasta, slow-simmered sauces, and melted
          cheeses unite to redefine your culinary journey with each
          mouthwatering bite.
        </Text>
        <Flex width="100%" justify="center">
          <ProductList filterValue="lasagna" />
        </Flex>
      </VStack>
      <Footer />
    </>
  );
};

export default LasagnaPage;
