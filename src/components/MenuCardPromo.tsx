import {
  Card,
  Image,
  Text,
  Heading,
  CardBody,
  Divider,
  SimpleGrid,
  CardFooter,
  HStack,
  Box,
} from "@chakra-ui/react";
import { ProductPromo } from "../hooks/useProductsPromotional";

interface Props {
  product: ProductPromo;
}

const MenuCardPromo = ({ product }: Props) => {
  return (
    <>
      <Card borderRadius={20} bg="#FFF" boxShadow="md">
        <Image
          src={`/images/products/${product.picture}`}
          objectFit="cover"
          height="350px"
          width="100%"
          borderTopLeftRadius={20}
          borderTopRightRadius={20}
          overflow="hidden"
          _hover={{
            transform: "scale(1.03)",
            transition: "transform .15s ease-in",
            borderRadius: 20,
          }}
        />
        <Heading
          marginTop={-12}
          marginLeft={2}
          bg="base.700"
          borderTopLeftRadius={20}
          borderBottomLeftRadius={20}
          opacity={0.8}
        >
          <Text color="base.50" p={2}>
            {product.productGroupName}
          </Text>
        </Heading>
        <CardBody>
          <Text color="base.700">{product.productDescription}</Text>
        </CardBody>
        <Divider borderColor="base.800" width={"100%"} />
        <CardFooter>
          <SimpleGrid columns={1} spacing={2} padding={2}>
            {product.package.map((prod) => (
              <HStack>
                <Box textAlign={"right"} height={10}>
                  <i className="fa-solid fa-basket-shopping product-detail-icon-link" />
                </Box>
                <Box textAlign={"left"}>
                  <Text key={prod.packageId} color={"base.800"}>
                    {prod.packageSize} - {prod.packageName}
                  </Text>
                </Box>
              </HStack>
            ))}
          </SimpleGrid>
        </CardFooter>
      </Card>
    </>
  );
};

export default MenuCardPromo;
