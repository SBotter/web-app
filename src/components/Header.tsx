import logo from "../assets/images/PastaLogo.png";
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  useBreakpointValue,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { IoIosArrowDropdown } from "react-icons/io";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import { FaCartShopping } from "react-icons/fa6";

const Header = () => {
  const { cartItems } = useContext(CartContext);

  const listMenuItems = [
    {
      id: "1",
      name: "Products",
      path: "/products",
      icon: "fa-regular fa-rectangle-list",
      display: "1",
    },
    {
      id: "2",
      name: "Contact",
      path: "/contact",
      icon: "fa-brands fa-whatsapp",
      display: "1",
    },
    {
      id: "3",
      name: "We Deliver",
      path: "/delivery",
      icon: "fa-solid fa-truck-monster",
      display: "0",
    },
  ];

  const displayMode = useBreakpointValue({ base: "menu", md: "hstack" });

  return (
    <Box bg="base.50" p={2} width="100%">
      <Flex align="center">
        <Link to="/">
          <Image
            src={logo}
            boxSize={{ base: "60px", sm: "80px", md: "110px" }}
            objectFit={"cover"}
          />
        </Link>
        <Spacer />

        <HStack>
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
                View Menu
              </MenuButton>
              <MenuList bgColor={"base.50"} borderColor={"base.800"}>
                {listMenuItems
                  .filter((d) => d.display == "1")
                  .map((item) => (
                    <MenuItem
                      as="a"
                      href={item.path}
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
              {listMenuItems
                .filter((d) => d.display == "1")
                .map((item) => (
                  <Button
                    key={item.id}
                    as={RouterLink}
                    to={item.path}
                    variant="outline"
                    bgColor="base.50"
                    borderColor={"base.800"}
                    color={"base.800"}
                    borderWidth="2"
                    leftIcon={<i className={item.icon} />}
                    _hover={{
                      bg: "base.800",
                      color: "base.50",
                      borderColor: "base.800",
                    }}
                  >
                    {item.name}
                  </Button>
                ))}
            </HStack>
          )}
          <Box paddingRight={5} paddingLeft={{ base: 0, md: 20 }}>
            <HStack>
              <Box padding={2}>
                <Link to="checkout">
                  <Avatar
                    size="md"
                    bg="base.50"
                    icon={
                      <FaCartShopping className="product-detail-cart-button-header" />
                    }
                  >
                    <AvatarBadge
                      boxSize={"1.25em"}
                      bg="base.50"
                      borderWidth={1}
                      borderColor={"base.800"}
                    >
                      <Text color={"base.800"} marginTop={3}>
                        {cartItems
                          ? cartItems.length > 0
                            ? cartItems.length
                            : 0
                          : 0}
                      </Text>
                    </AvatarBadge>
                  </Avatar>
                </Link>
              </Box>
            </HStack>
          </Box>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
