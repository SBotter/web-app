import {
  SimpleGrid,
  Heading,
  Text,
  Card,
  Box,
  CardFooter,
  CardHeader,
  useBreakpointValue,
  CardBody,
  VStack,
  Divider,
  Flex,
  HStack,
} from "@chakra-ui/react";

import useProductsPromotional from "../hooks/useProductsPromotional";
import MenuCardPromo from "./MenuCardPromo";

const MenuPromoList = () => {
  const { data } = useProductsPromotional();
  const displayMode = useBreakpointValue({ base: "text", md: "menu" });
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
            {displayMode === "menu" ? (
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
            ) : (
              <>
                <Card
                  borderRadius={20}
                  bg="#FFF"
                  boxShadow="md"
                  width={"100%"}
                  marginTop={-8}
                >
                  <CardBody width={"100%"}>
                    {data.map((prod) => (
                      <Box key={prod.productId} width={"100%"}>
                        <VStack>
                          <Text
                            fontSize="15px"
                            fontWeight="bold"
                            color="base.800"
                            verticalAlign={"left"}
                          >
                            {prod.productGroupName}
                          </Text>
                          {prod.package.map((pkg) => (
                            <>
                              <Flex width={"100%"} marginTop={-7}>
                                <HStack
                                  width={"100%"}
                                  justifyContent={"center"}
                                >
                                  <Box
                                    key="icon"
                                    width={"10%"}
                                    textAlign={"center"}
                                  >
                                    <i className="fa-regular fa-heart product-detail-icon-link" />
                                  </Box>
                                  <Box
                                    key={pkg.packageName}
                                    width={"70%"}
                                    verticalAlign={"left"}
                                    marginTop={2}
                                  >
                                    <Text color={"base.800"}>
                                      {pkg.packageName}
                                    </Text>
                                  </Box>
                                  <Box
                                    key={pkg.packageName}
                                    width={"20%"}
                                    verticalAlign={"left"}
                                  >
                                    <Text color={"base.800"}>
                                      {pkg.packageSize}
                                    </Text>
                                  </Box>
                                </HStack>
                              </Flex>
                            </>
                          ))}
                          <Divider
                            backgroundColor={"base.800"}
                            width="100%"
                            marginTop={-2}
                          />
                        </VStack>
                      </Box>
                    ))}
                  </CardBody>
                </Card>
              </>
            )}
          </CardFooter>
        </Card>
      </Box>
    </>
  );
};

export default MenuPromoList;
