import {
  Box,
  SimpleGrid,
  Image,
  VStack,
  Text,
  Heading,
  Divider,
  Button,
} from "@chakra-ui/react";
import { Product } from "../hooks/useProducts";
import PackageTable from "./PackageTable";
import IngredientsPanel from "./IngredientsPanel";
import { Link as RouterLink } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";

interface Props {
  product: Product;
}

const ProductDetail = ({ product }: Props) => {
  return (
    <Box width="100%" p={{ base: 2, md: 4 }}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ md: 4 }}>
        <Box boxShadow="md" border={2}>
          <Image
            src={`/images/products/${product.picture[0].picturePath}`}
            objectFit="cover"
            height={{ base: "350px", md: "100%" }}
            width="100%"
            overflow="hidden"
          />
        </Box>
        <Box width="100%" p={{ base: 2, md: 4 }}>
          <VStack alignItems="flex-start">
            <Heading>
              <Text color="base.700" fontSize="40px">
                {product.productName}
              </Text>
            </Heading>
            <Text color="base.700" fontSize="15px" marginTop={-8}>
              {product.category[0].categoryName}
            </Text>
            <Divider bgColor="base.800" marginTop={-5} />
            <Box marginTop={10}>
              <IngredientsPanel
                ingredient={product.ingredient}
                instruction={product.instruction}
              />
            </Box>
            <Box width="100%" marginTop={10}>
              <PackageTable productPackage={product.package} />
            </Box>
            <Box width="100%" p={{ base: 2, md: 4 }} textAlign={"center"}>
              <SimpleGrid
                columns={{ base: 1, md: 2 }}
                spacing={{ base: 2, md: 4 }}
              >
                <Button
                  as={RouterLink} // Use the Link component from react-router-dom
                  to={"/contact"}
                  leftIcon={<FaWhatsapp size="1.3em" />}
                  colorScheme="base"
                  variant="solid"
                >
                  Place you Order
                </Button>
                <Button
                  as={RouterLink} // Use the Link component from react-router-dom
                  to={"/delivery"}
                  leftIcon={<i className="fa-solid fa-truck-monster" />}
                  colorScheme="base"
                  variant="solid"
                >
                  WE DELIVER!
                </Button>
              </SimpleGrid>
            </Box>
          </VStack>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default ProductDetail;
