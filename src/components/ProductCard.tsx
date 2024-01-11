import { Product } from "../hooks/useProducts";
import {
  Card,
  CardBody,
  Text,
  Image,
  VStack,
  Divider,
  Box,
} from "@chakra-ui/react";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <Box
      _hover={{
        transform: "scale(1.03)",
        transition: "transform .15s ease-in",
      }}
      width="100%"
      boxSize="100%"
      borderRadius={10}
      overflow="hidden"
    >
      <Card borderRadius={10} overflow="hidden" bg="base.100">
        <Image
          src={`/images/products/${product.picture[0].picturePath}`}
          objectFit="cover"
          boxSize="100%"
          height="350px"
          padding={2}
          borderRadius={20}
          overflow="hidden"
        />

        <CardBody>
          <VStack marginTop={0} alignItems="start">
            <Text fontSize={20} color="base.700" fontWeight={"500"}>
              {product.productName}
            </Text>
            <Divider borderColor="base.800" />
            <Text color="base.700">{product.productDescription}</Text>
          </VStack>
        </CardBody>
      </Card>
    </Box>
  );
};

export default ProductCard;
