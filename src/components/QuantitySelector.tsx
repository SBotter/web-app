import { Box, Text } from "@chakra-ui/layout";
import { HStack } from "@chakra-ui/react";

interface QuantitySelectorProps {
  onMinusButtonClicked: () => void;
  onPlusButtonClicked: () => void;
  quantity: number;
}

export function QuantitySelector({
  onMinusButtonClicked,
  onPlusButtonClicked,

  quantity,
}: QuantitySelectorProps) {
  return (
    <Box position="relative" textAlign={"center"} paddingTop={3}>
      <HStack>
        <Box position="relative" marginTop={-4}>
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
        <Box position="relative" marginTop={-4}>
          <i
            className="fa-solid fa-square-plus product-detail-icon-link"
            onClick={onPlusButtonClicked}
          />
        </Box>
      </HStack>
    </Box>
  );
}
