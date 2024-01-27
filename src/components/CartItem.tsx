import {
  Box,
  HStack,
  VStack,
  Image,
  Text,
  Flex,
  SimpleGrid,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import { QuantitySelector } from "./QuantitySelector";

interface CartItemProps {
  productId: string;
  packageId: string;
  packageName: string;
  packageUnit: string;
  packageSize: string;
  name: string;
  price: number;
  quantity: number;
  imageSrc: string;
  categoryName: string;
}

export function CartItem(cartItem: CartItemProps) {
  const {
    //productId,
    //packageId,
    //packageName,
    packageUnit,
    packageSize,
    name,
    price,
    quantity,
    imageSrc,

    //categoryName,
  } = cartItem;

  const { updateItemFromCart, removeItemFromCart } = useContext(CartContext);

  const totalPriceFromItem = (price * quantity).toFixed(2);

  function handleMinusButtonClicked() {
    if (quantity === 0) return;
    const updatedCartItem = {
      ...cartItem,
      quantity: quantity - 1,
    };

    updateItemFromCart(updatedCartItem);
  }

  function handlePlusButtonClicked() {
    const updatedCartItem = {
      ...cartItem,
      quantity: quantity + 1,
    };

    updateItemFromCart(updatedCartItem);
  }

  function handleRemoveItemButtonClicked() {
    removeItemFromCart(cartItem);
  }

  return (
    <Box
      width={"100%"}
      padding={2}
      borderRadius={20}
      borderWidth={1}
      borderColor={"base.800"}
      bg="#FFF"
      marginBottom={2}
    >
      <Grid
        width={"100%"}
        templateAreas={`"title title"
                  "img price"
                  "img cart"`}
        gridTemplateRows={"60px 1fr 60px"}
        gridTemplateColumns={"100px 1fr"}
        h="180px"
        gap="1"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem pl={2} bg="#FFF" area={"title"}>
          <VStack align="start">
            <Text
              color="base.800"
              fontSize={20}
              fontWeight={"bold"}
              marginTop={-1}
            >
              {name}
            </Text>
            <Text color="base.800" fontSize={13} marginTop={-6}>
              {quantity} {packageUnit} {packageSize}
            </Text>
          </VStack>
        </GridItem>
        <GridItem bg="#FFF" area={"img"}>
          <Box
            marginTop={2}
            borderRadius="full"
            borderWidth={1}
            borderColor={"#base.800"}
            bg="base.800"
          >
            <Box borderRadius="full" borderWidth={5} borderColor={"#FFF"}>
              <Image
                src={`/images/products/${imageSrc}`}
                boxSize={"90px"}
                borderRadius="full"
                objectFit={"cover"}
              />
            </Box>
          </Box>
        </GridItem>
        <GridItem bg="#FFF" area={"price"}>
          <SimpleGrid columns={2} justifyContent={"space-around"}>
            <Flex justifyContent={"right"} marginTop={3}>
              <i className="fa-solid fa-dollar-sign product-detail-icon-link" />
            </Flex>
            <Flex justifyContent={"left"} marginTop={1}>
              <Text color="base.800" fontSize={25} fontWeight={"bold"}>
                {totalPriceFromItem}
              </Text>
            </Flex>
          </SimpleGrid>
        </GridItem>
        <GridItem bg="#FFF" area={"cart"}>
          <Flex
            borderColor={"black"}
            justifyContent={"space-evenly"}
            textAlign={"center"}
            verticalAlign={"center"}
          >
            <HStack>
              <QuantitySelector
                quantity={quantity}
                onMinusButtonClicked={() => handleMinusButtonClicked()}
                onPlusButtonClicked={() => handlePlusButtonClicked()}
              />
              <Box marginTop={-1}>
                <i
                  className="fa-solid fa-trash product-detail-icon-link"
                  onClick={() => handleRemoveItemButtonClicked()}
                />
              </Box>
            </HStack>
          </Flex>
        </GridItem>
      </Grid>
    </Box>
  );
}
