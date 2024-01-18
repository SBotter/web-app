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
      <Card borderRadius={20} bg="#FFF" boxShadow="md" height={"350px"}>
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
          <Text color="base.800">{product.productGroupName}</Text>
          <Divider backgroundColor={"base.800"} width="100%" />
        </CardHeader>
        <CardBody marginTop={-8} p={0}>
          <SimpleGrid columns={1} spacing={2} p={2}>
            {product.package.map((prod) => (
              <Box
                key={prod.packageId}
                textAlign={"left"}
                height={{ base: "45px" }}
              >
                <Text color={"base.800"}>
                  {prod.packageSize} - {prod.packageName}
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
