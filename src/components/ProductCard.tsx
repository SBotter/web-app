import { Product } from "../hooks/useProducts";
import {
  Card,
  CardBody,
  Text,
  Image,
  Divider,
  Box,
  CardFooter,
  Button,
} from "@chakra-ui/react";
import { GoSearch } from "react-icons/go";
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
      <Card borderRadius={10} overflow="hidden" bg="#FFF" height="100%">
        <Link to={`/products/detail/${product.productId}`}>
          <Image
            src={`/images/products/${product.picture[0].picturePath}`}
            objectFit="cover"
            boxSize="100%"
            height="350px"
            padding={2}
            borderRadius={20}
            overflow="hidden"
          />
        </Link>
        <CardBody>
          <Box width={"100%"} justifyItems="left">
            <Text fontSize={20} color="base.700" fontWeight={"500"}>
              {product.productName}
            </Text>
            <Text color="base.700" marginTop={-5}>
              {product.category[0].categoryName}
            </Text>
          </Box>
          <Divider borderColor="base.800" />
          <Text color="base.700" marginTop={10}>
            {product.productDescription}
          </Text>
        </CardBody>
        <Divider borderColor="base.800" />
        <CardFooter margin="auto">
          <Button
            as={RouterLink} // Use the Link component from react-router-dom
            to={`/products/detail/${product.productId}`}
            leftIcon={<GoSearch />}
            colorScheme="base"
            variant="solid"
          >
            Details
          </Button>
        </CardFooter>
      </Card>
    </Box>
  );
};

export default ProductCard;
