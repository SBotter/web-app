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
import PackageTable from "./PackageTable";
import IngredientsPanel from "./IngredientsPanel";

interface Props {
  product: Product;
}

const ProductDetail = ({ product }: Props) => {
  return (
    <Box width="100%" p={4}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        <Box boxShadow="md" border={2}>
          <Image
            src={`/images/products/${product.picture[0].picturePath}`}
            objectFit="cover"
            height={{ base: "350px", md: "100%" }}
            width="100%"
            overflow="hidden"
          />
        </Box>
        <Box width="100%" p={4}>
          <VStack alignItems="flex-start">
            <Heading>
              <Text color="base.700" fontSize="40px">
                {product.productName}
              </Text>
            </Heading>
            <Text color="base.700" fontSize="15px">
              {product.productGroupName}
            </Text>
            <Divider bgColor="base.700" />
            <Box marginTop={10}>
              <IngredientsPanel
                ingredient={product.ingredient}
                instruction={product.instruction}
              />
            </Box>
            <Box width="100%" marginTop={10}>
              <PackageTable productPackage={product.package} />
            </Box>
          </VStack>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default ProductDetail;
