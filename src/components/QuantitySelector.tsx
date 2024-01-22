import { Box, Flex, Text } from "@chakra-ui/layout";

interface QuantitySelectorProps {
  onMinusButtonClicked: () => void;
  onPlusButtonClicked: () => void;
  onAddToCartButtonClicked: () => void;
  quantity: number;
}

export function QuantitySelector({
  onMinusButtonClicked,
  onPlusButtonClicked,
  onAddToCartButtonClicked,
  quantity,
}: QuantitySelectorProps) {
  return (
    <Box position="relative" textAlign={"center"} paddingTop={3}>
      <Flex
        borderColor={"black"}
        justifyContent={"space-evenly"}
        textAlign={"center"}
        verticalAlign={"center"}
      >
        <Box position="relative">
          <i
            className="fa-solid fa-square-minus product-detail-icon-link"
            onClick={onMinusButtonClicked}
          />
        </Box>
        <Box
          width={7}
          borderColor={"#000"}
          textAlign={"center"}
          justifyContent={"center"}
          justifyItems={"center"}
          position="relative"
          paddingRight={1}
          paddingLeft={1}
        >
          <Text
            color="base.800"
            fontSize="15px"
            bg={"#FFF"}
            borderWidth={1}
            borderColor={"base.800"}
            height={5}
          >
            {quantity}
          </Text>
        </Box>
        <Box position="relative">
          <i
            className="fa-solid fa-square-plus product-detail-icon-link"
            onClick={onPlusButtonClicked}
          />
        </Box>
        <Box position="relative">
          <i
            className="fa-solid fa-cart-shopping product-detail-icon-link"
            onClick={onAddToCartButtonClicked}
          />
        </Box>
      </Flex>
    </Box>
  );
}
