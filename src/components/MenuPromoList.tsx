import {
  SimpleGrid,
  Heading,
  Text,
  Card,
  Box,
  CardFooter,
} from "@chakra-ui/react";

import useProductsPromotional from "../hooks/useProductsPromotional";
import MenuCardPromo from "./MenuCardPromo";

const MenuPromoList = () => {
  const { data } = useProductsPromotional();
  return (
    <>
      <Box p={5}>
        <Card borderRadius={20} bg="base.100" boxShadow="md">
          <Heading
            marginTop={-20}
            marginLeft={10}
            marginRight={0}
            bg="base.700"
            borderTopLeftRadius={20}
            borderBottomLeftRadius={20}
            opacity={0.8}
          >
            <Text
              color="base.50"
              fontSize={{ base: "30px", md: "50px", lg: "80px" }}
              align="center"
            >
              Savor the Love: Inside Our Exclusive Handmade Fresh Pasta
              Valentine's Basket
            </Text>
          </Heading>

          <CardFooter p={0}>
            <SimpleGrid columns={{ base: 1, md: 3 }} p={5} spacing={5}>
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
