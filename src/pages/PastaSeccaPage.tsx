import { Heading, VStack, Text, Flex } from "@chakra-ui/react";
import Footer from "../components/Footer";
import ProductList from "../components/ProductList";

const PastaSeccaPage = () => {
  return (
    <>
      <VStack>
        <Heading marginTop={10} marginBottom={10} p={5}>
          <Text
            color="base.700"
            fontSize={{ base: "30px", md: "50px", lg: "80px" }}
            align="center"
          >
            Dried Pasta Delights: Handcrafted Fettuccine, Spaghetti, and More.
          </Text>
        </Heading>
        <Text
          color="base.700"
          fontSize={{ base: "15px", md: "25px", lg: "40px" }}
          align="center"
          p={5}
        >
          Explore the simplicity and versatility of our dried pasta collection,
          featuring meticulously crafted fettuccine and spaghetti. Made with the
          finest durum wheat, these artisanal delights promise a perfect al
          dente texture, providing a canvas for your culinary creations. Elevate
          your meals with the authentic taste of traditional Italian pasta,
          ready to transform any dish into a masterpiece.
        </Text>
        <Flex width="100%" justify="center">
          <ProductList filterValue="pastasecca" />
        </Flex>
      </VStack>
      <Footer />
    </>
  );
};

export default PastaSeccaPage;
