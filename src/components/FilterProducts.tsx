import {
  Box,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { IoIosArrowDropdown } from "react-icons/io";

const FilterProducts = () => {
  const listFilter = [
    {
      id: "stuffedpasta",
      name: "Stuffed Pasta",
      path: "/stuffedpasta",
    },
    {
      id: "focaccia",
      name: "Focaccia",
      path: "/focaccia",
    },
    {
      id: "sauce",
      name: "Sauce",
      path: "/sauce",
    },
    {
      id: "pastasecca",
      name: "Pasta Secca",
      path: "/pastasecca",
    },
    {
      id: "lasagna",
      name: "Lasagna",
      path: "/lasagna",
    },
    {
      id: "canneloni",
      name: "Canneloni",
      path: "/canneloni",
    },
  ];
  const displayMode = useBreakpointValue({ base: "menu", md: "hstack" });

  return (
    <Box p={4}>
      {displayMode === "menu" ? (
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<IoIosArrowDropdown />}
            bg="base.50"
            border={1}
            color="base.800"
            borderRadius={20}
            _hover={{
              bg: "base.800",
              color: "base.50",
              borderColor: "base.800",
            }}
          >
            Find Your choice!
          </MenuButton>

          <MenuList bgColor={"base.50"} borderColor={"base.800"}>
            {listFilter
              .sort((a, b) => (a.name > b.name ? 1 : -1))
              .map((item) => (
                <MenuItem
                  as="a"
                  href={`/products${item.path}`}
                  key={item.id}
                  bg="base.50"
                  color="base.800"
                  _hover={{
                    bg: "base.100",
                    color: "base.800",
                    fontWeight: "bold",
                  }}
                >
                  {item.name}
                </MenuItem>
              ))}
          </MenuList>
        </Menu>
      ) : (
        <HStack spacing={4}>
          {listFilter
            .sort((a, b) => (a.name > b.name ? 1 : -1))
            .map((item) => (
              <Button
                key={item.id}
                as={RouterLink} // Use the Link component from react-router-dom
                to={`/products${item.path}`}
                colorScheme="base"
                variant="solid"
              >
                {item.name}
              </Button>
            ))}
        </HStack>
      )}
    </Box>
  );
};

export default FilterProducts;
