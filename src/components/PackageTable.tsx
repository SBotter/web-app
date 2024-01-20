import { Package } from "../hooks/useProducts";
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
} from "@chakra-ui/react";

interface Props {
  productPackage: Package[];
}

const PackageTable = ({ productPackage }: Props) => {
  return (
    <Flex justifyContent={"center"}>
      <Table size="sm" colorScheme="base">
        <Thead bg="base.200">
          <Tr>
            <Th width="15%">
              <HStack>
                <i className="fa-solid fa-scale-balanced product-detail-delivery_cost" />
                <Box paddingTop={3} paddingLeft={0}>
                  <Text color="base.700" fontSize="17px">
                    Size
                  </Text>
                </Box>
              </HStack>
            </Th>
            <Th width="15%">
              <HStack>
                <i className="fa-solid fa-dollar-sign product-detail-delivery_cost" />
                <Box paddingTop={3}>
                  <Text color="base.700" fontSize="17px">
                    Price
                  </Text>
                </Box>
              </HStack>
            </Th>
            <Th width="40%">
              <HStack>
                <i className="fa-solid fa-people-roof product-detail-delivery_cost" />
                <Box paddingTop={3}>
                  <Text color="base.700" fontSize="17px">
                    Details
                  </Text>
                </Box>
              </HStack>
            </Th>
            <Th width="30%"></Th>
          </Tr>
        </Thead>

        <Tbody>
          {productPackage.map((item) => (
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
              <Td></Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  );
};

export default PackageTable;
