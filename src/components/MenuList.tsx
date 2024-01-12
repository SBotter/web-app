import { SimpleGrid, HStack, VStack, Heading } from "@chakra-ui/react";

import MenuCard from "./MenuCard";
import useMenuList from "../hooks/useMenuList";

const MenuList = () => {
  const { data } = useMenuList();
  return (
    <>
      <VStack>
        <Heading color="base.700" marginTop={10} marginBottom={10}>
          Artisanal Handcrafted Pasta, Culinary Excellence.
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
