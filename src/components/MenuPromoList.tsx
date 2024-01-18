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
          <CardFooter justifyContent={"space-between"}>
            <SimpleGrid
              columns={{ base: 1, sm: 1, md: 4, lg: 4, xl: 4 }}
              spacing={{ base: 1, sm: 3, md: 4, lg: 4, xl: 4 }}
              p={{ base: 1, sm: 3, md: 4, lg: 4, xl: 4 }}
              width={"100%"}
            >
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
