import {
  Box,
  SimpleGrid,
  Image,
  VStack,
  Text,
  Heading,
  Divider,
} from "@chakra-ui/react";
import { Product } from "../hooks/useProducts";

import IngredientsPanel from "./IngredientsPanel";

import { PackageTable } from "./PackageTable";

interface Props {
  product: Product;
}

const ProductDetail = ({ product }: Props) => {
  return (
    <Box width="100%" p={{ base: 1, sm: 1, md: 4 }}>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 1, sm: 1, md: 4 }}
      >
        <Box boxShadow="md" border={2}>
          <Image
            src={`/images/products/${product.picture[0].picturePath}`}
            objectFit="cover"
            height={{ base: "350px", md: "100%" }}
            width="100%"
            overflow="hidden"
          />
        </Box>
        <Box width="100%">
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
            <Box marginTop={-5}>
              <IngredientsPanel
                ingredient={product.ingredient}
                instruction={product.instruction}
              />
            </Box>
            <Box width="100%" marginTop={0}>
              <PackageTable product={product} />
            </Box>
          </VStack>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default ProductDetail;
