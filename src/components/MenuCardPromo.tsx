import {
  Card,
  Image,
  Text,
  CardBody,
  Divider,
  SimpleGrid,
  Box,
  CardHeader,
} from "@chakra-ui/react";
import { ProductPromo } from "../hooks/useProductsPromotional";

interface Props {
  product: ProductPromo;
}

const MenuCardPromo = ({ product }: Props) => {
  return (
    <>
      <Card borderRadius={20} bg="#FFF" boxShadow="md" height={"100%"}>
        <CardHeader p={2}>
          <Image
            src={`/images/products/${product.picture}`}
            objectFit="cover"
            height="200px"
            width="100%"
            borderTopLeftRadius={20}
            borderTopRightRadius={20}
            overflow="hidden"
          />
          <Text color="base.800" fontSize="15px" fontWeight="bold">
            {product.productGroupName}
          </Text>
          <Divider backgroundColor={"base.800"} width="100%" marginTop={-2} />
        </CardHeader>
        <CardBody p={0} marginTop={{ md: -5, lg: -3 }}>
          <SimpleGrid columns={1} spacing={2} p={2}>
            {product.package.map((prod) => (
              <Box
                key={prod.packageId}
                textAlign={"left"}
                height={{ base: "45px" }}
                marginTop={{ md: 0, lg: -2 }}
              >
                <Text color={"base.800"}>
                  {prod.packageName} - {prod.packageSize}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </CardBody>
      </Card>
    </>
  );
};

export default MenuCardPromo;
