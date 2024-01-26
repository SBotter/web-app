import { Product } from "../hooks/useProducts";
import {
  Table,
  Th,
  Thead,
  Tr,
  Text,
  Tbody,
  Td,
  Box,
  HStack,
  Flex,
  useToast,
} from "@chakra-ui/react";

import { useContext, useState } from "react";
import { QuantitySelector } from "./QuantitySelector";
import { CartContext } from "./CartContext";

interface Props {
  product: Product;
}

export function PackageTable({ product }: Props) {
  const toast = useToast();

  const [itemQuantities, setItemQuantities] = useState(
    product.package.map(() => 1)
  );
  const { addItemToCart } = useContext(CartContext);

  function handleMinusButtonClicked(index: number) {
    setItemQuantities((prevQuantities) => {
      if (prevQuantities[index] === 1) return prevQuantities;
      const updatedQuantities = [...prevQuantities];
      updatedQuantities[index] = prevQuantities[index] - 1;
      return updatedQuantities;
    });
  }

  function handlePlusButtonClicked(index: number) {
    setItemQuantities((prevQuantities) => {
      const updatedQuantities = [...prevQuantities];
      updatedQuantities[index] = prevQuantities[index] + 1;
      return updatedQuantities;
    });
  }

  function handleAddToCartButtonClicked(index: number) {
    addItemToCart({
      productId: product.productId,
      packageId: product.package[index].packageId,
      packageName: product.package[index].packageName,
      packageUnit: product.package[index].packageUnit,
      packageSize: product.package[index].packageSize,
      name: product.productName,
      price: product.package[index].packagePrice,
      quantity: Number(itemQuantities[index]),
      imageSrc: product.picture[0].picturePath,
      categoryName: product.category[0].categoryName,
    });

    // Display a Chakra UI toast
    toast({
      title: "Item added to cart",
      description: product.productName,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  }
  return (
    <Flex justifyContent={"center"}>
      <Table size="sm" colorScheme="base">
        <Thead bg="base.200">
          <Tr>
            <Th width="10%">
              <HStack>
                <i className="fa-solid fa-scale-balanced product-detail-delivery_cost" />
                <Box paddingTop={4} paddingLeft={0}>
                  <Text color="base.700" fontSize="17px">
                    Size
                  </Text>
                </Box>
              </HStack>
            </Th>
            <Th width="10%">
              <HStack>
                <i className="fa-solid fa-dollar-sign product-detail-delivery_cost" />
                <Box paddingTop={4}>
                  <Text color="base.700" fontSize="17px">
                    Price
                  </Text>
                </Box>
              </HStack>
            </Th>
            <Th width="60%">
              <HStack>
                <i className="fa-solid fa-people-roof product-detail-delivery_cost" />
                <Box paddingTop={4}>
                  <Text color="base.700" fontSize="17px">
                    Details
                  </Text>
                </Box>
              </HStack>
            </Th>
            <Th width="20%"></Th>
          </Tr>
        </Thead>

        <Tbody>
          {product.package.map((item, index) => (
            <Tr key={item.packageId}>
              <Td>
                <Box paddingTop={3}>
                  <Text color="base.700" fontSize="18px">
                    {item.packageSize} ({item.packageUnit})
                  </Text>
                </Box>
              </Td>
              <Td>
                <HStack>
                  <i className="fa-solid fa-dollar-sign product-detail-delivery_cost" />
                  <Box paddingTop={3}>
                    <Text color="base.700" fontSize="17px">
                      {item.packagePrice}
                    </Text>
                  </Box>
                </HStack>
              </Td>
              <Td>
                <Box paddingTop={3}>
                  <Text color="base.700" fontSize="18px">
                    {item.packageDescription}
                  </Text>
                </Box>
              </Td>
              <Td textAlign={"center"}>
                <Flex
                  borderColor={"black"}
                  justifyContent={"space-evenly"}
                  textAlign={"center"}
                  verticalAlign={"center"}
                >
                  <HStack>
                    <QuantitySelector
                      quantity={itemQuantities[index]}
                      onMinusButtonClicked={() =>
                        handleMinusButtonClicked(index)
                      }
                      onPlusButtonClicked={() => handlePlusButtonClicked(index)}
                    />
                    <Box marginTop={-1}>
                      <i
                        className="fa-solid fa-cart-shopping product-detail-icon-link"
                        onClick={() => handleAddToCartButtonClicked(index)}
                      />
                    </Box>
                  </HStack>
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  );
}
