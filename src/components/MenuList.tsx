import { SimpleGrid, HStack, VStack, Heading, Text } from "@chakra-ui/react";

import MenuCard from "./MenuCard";
import useMenuList from "../hooks/useMenuList";

const MenuList = () => {
  const { data } = useMenuList();
  return (
    <>
      <VStack>
        <Heading marginTop={10} marginBottom={10}>
          <Text
            color="base.700"
            fontSize={{ base: "30px", md: "50px", lg: "80px" }}
            align="center"
          >
            Artisanal Handcrafted Pasta, Culinary Excellence.
          </Text>
        </Heading>

        <HStack>
          <SimpleGrid columns={{ base: 1, md: 3 }} p={5} spacing={5}>
            {data.map((prod) => (
              <MenuCard key={prod.productGroupId} product={prod} />
            ))}
          </SimpleGrid>
        </HStack>
      </VStack>
    </>
  );
};

export default MenuList;
