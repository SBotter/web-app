import { Box, HStack, VStack, Image, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { CartContext } from "./CartContext";

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

  const { updateItemFromCart, removeItemFromnCart } = useContext(CartContext);

  const totalPriceFromItem = (price * quantity).toFixed(2);

  return (
    <VStack>
      <HStack
        width={"100%"}
        padding={2}
        borderRadius={20}
        borderWidth={1}
        borderColor={"base.800"}
        bg=""
      >
        <Box>
          <Box
            borderRadius="full"
            borderWidth={1}
            borderColor={"#base.800"}
            bg="base.800"
          >
            <Box borderRadius="full" borderWidth={5} borderColor={"#FFF"}>
              <Image
                src={`/images/products/${imageSrc}`}
                boxSize={"80px"}
                borderRadius="full"
                objectFit={"cover"}
              />
            </Box>
          </Box>
        </Box>
        <Box marginLeft={5} width={"60%"}>
          <VStack align="start">
            <Text
              color="base.800"
              fontSize={20}
              fontWeight={"bold"}
              marginTop={3}
            >
              {name}
            </Text>
            <Text color="base.800" fontSize={15} marginTop={-5}>
              {quantity} {packageUnit} {packageSize}
            </Text>
          </VStack>
        </Box>
        <Box>
          <HStack align="start">
            <Box marginTop={4}>
              <i className="fa-solid fa-dollar-sign product-detail-icon-link" />
            </Box>
            <Box>
              <Text
                color="base.800"
                fontSize={20}
                fontWeight={"bold"}
                marginTop={3}
              >
                {totalPriceFromItem}
              </Text>
            </Box>
          </HStack>
        </Box>
      </HStack>
    </VStack>
  );
}
