import {
  Box,
  SimpleGrid,
  Image,
  VStack,
  Text,
  Tabs,
  TabList,
  Tab,
  TabIndicator,
  TabPanels,
  TabPanel,
  HStack,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
} from "@chakra-ui/react";
import { Product } from "../hooks/useProducts";

interface Props {
  product: Product;
}

const ProductDetail = ({ product }: Props) => {
  return (
    <Box width="100%" p={4}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        <Image
          src={`/images/products/${product.picture[0].picturePath}`}
          objectFit="cover"
          height="350px"
          width="100%"
          overflow="hidden"
        />
        <VStack textAlign={"left"}>
          <Text color="base.700" fontSize="20px">
            {product.productName}
          </Text>
          <Text color="base.700" fontSize="15px">
            {product.productGroupName}
          </Text>
          <Tabs position="relative" variant="unstyled" colorScheme="base">
            <TabList>
              <Tab>
                <Text color="base.700">Ingredients</Text>
              </Tab>
              <Tab>
                <Text color="base.700">Instructions</Text>
              </Tab>
            </TabList>
            <TabIndicator
              mt="-1.5px"
              height="2px"
              bg="base.500"
              borderRadius="1px"
            />
            <TabPanels>
              <TabPanel>
                <Text color="base.700">Ingredients</Text>
              </TabPanel>
              <TabPanel>
                <Text color="base.700">Instructions</Text>
              </TabPanel>
            </TabPanels>
          </Tabs>

          <Table size="sm" colorScheme="base">
            <Thead>
              <Tr>
                <Th>
                  <i className="fa-solid fa-scale-balanced product-detail-icon-link" />
                  <Text color="base.700" fontSize="20px">
                    Size
                  </Text>
                </Th>
                <Th>
                  <i className="fa-solid fa-dollar-sign product-detail-icon-link" />
                  <Text color="base.700" fontSize="20px">
                    Price
                  </Text>
                </Th>
                <Th>
                  <i className="fa-solid fa-people-roof product-detail-icon-link" />
                  <Text color="base.700" fontSize="20px">
                    Details
                  </Text>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>
                  <Text color="base.700" fontSize="18px">
                    {product.package[0].packageSize}
                  </Text>
                </Td>
                <Td>
                  <Text color="base.700" fontSize="18px">
                    {product.package[0].packagePrice}
                  </Text>
                </Td>
                <Td>
                  <Text color="base.700" fontSize="18px">
                    {product.package[0].packageDescription}
                  </Text>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Text color="base.700" fontSize="18px">
                    {product.package[1].packageSize}
                  </Text>
                </Td>
                <Td>
                  <Text color="base.700" fontSize="18px">
                    {product.package[1].packagePrice}
                  </Text>
                </Td>
                <Td>
                  <Text color="base.700" fontSize="18px">
                    {product.package[1].packageDescription}
                  </Text>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </VStack>
      </SimpleGrid>
    </Box>
  );
};

export default ProductDetail;
