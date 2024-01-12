import { Product } from "../hooks/useProducts";
import {
  Card,
  CardBody,
  Text,
  Image,
  VStack,
  Divider,
  Box,
  CardFooter,
  Button,
} from "@chakra-ui/react";
import { FaCartPlus } from "react-icons/fa";
import { Link, Link as RouterLink } from "react-router-dom";

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
      boxShadow="md"
    >
      <Link to={`/products/detail/${product.productId}`}>
        <Card borderRadius={10} overflow="hidden" bg="base.100" height="100%">
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
          <Divider borderColor="base.800" />
          <CardFooter margin="auto">
            <Button
              as={RouterLink} // Use the Link component from react-router-dom
              to={`/products/detail/${product.productId}`}
              leftIcon={<FaCartPlus />}
              colorScheme="base"
              variant="solid"
            >
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      </Link>
    </Box>
  );
};

export default ProductCard;
