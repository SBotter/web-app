import {
  SimpleGrid,
  Heading,
  Text,
  Card,
  Box,
  CardFooter,
  CardHeader,
} from "@chakra-ui/react";

import useProductsPromotional from "../hooks/useProductsPromotional";
import MenuCardPromo from "./MenuCardPromo";

const MenuPromoList = () => {
  const { data } = useProductsPromotional();
  return (
    <>
      <Box p={5}>
        <Card borderRadius={20} bg="base.100" boxShadow="md" opacity={0.9}>
          <CardHeader>
            <Heading>
              <Text
                color="base.800"
                fontSize={{ base: "20px", md: "30px", lg: "40px" }}
                align="center"
              >
                Inside Our Exclusive Handmade Fresh Pasta Valentine's Basket
              </Text>
            </Heading>
          </CardHeader>
          <CardFooter p={0}>
            <SimpleGrid columns={{ base: 2, md: 4 }} p={4} spacing={4}>
              {data.map((prod) => (
                <MenuCardPromo key={prod.productId} product={prod} />
              ))}
            </SimpleGrid>
          </CardFooter>
        </Card>
      </Box>
    </>
  );
};

export default MenuPromoList;
