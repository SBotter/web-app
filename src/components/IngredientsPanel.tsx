import {
  Box,
  HStack,
  SimpleGrid,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { Ingredient, Instruction } from "../hooks/useProducts";

interface Props {
  ingredient: Ingredient[];
  instruction: Instruction[];
}

const IngredientsPanel = ({ ingredient, instruction }: Props) => {
  return (
    <Tabs position="relative" variant="unstyled" colorScheme="base">
      <TabList>
        <Tab>
          <HStack justifyContent="space-around">
            <i className="fa-solid fa-list-ul product-detail-delivery_cost" />
            <Box paddingTop={3} paddingLeft={0}>
              <Text color="base.700">Ingredients</Text>
            </Box>
          </HStack>
        </Tab>
        <Tab>
          <HStack justifyContent="space-around">
            <i className="fa-solid fa-utensils product-detail-delivery_cost" />
            <Box paddingTop={3} paddingLeft={0}>
              <Text color="base.700">Instructions</Text>
            </Box>
          </HStack>
        </Tab>
      </TabList>
      <TabIndicator mt="-1.5px" height="2px" bg="base.500" borderRadius="1px" />
      <TabPanels>
        <TabPanel>
          <SimpleGrid columns={2} spacing={4}>
            {ingredient.map((item) => (
              <HStack key={item.ingredientId}>
                <i className="fa-solid fa-check product-detail-icon-link" />
                <Box paddingTop={3} paddingLeft={0}>
                  <Text color="base.700">{item.ingredientName}</Text>
                </Box>
              </HStack>
            ))}
          </SimpleGrid>
        </TabPanel>
        <TabPanel>
          <SimpleGrid columns={1} spacing={4}>
            {instruction.map((item) => (
              <HStack key={item.instructionId}>
                <i className="fa-solid fa-check product-detail-icon-link" />
                <Box paddingTop={3} paddingLeft={0}>
                  <Text color="base.700">{item.instructionName}</Text>
                </Box>
              </HStack>
            ))}
          </SimpleGrid>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default IngredientsPanel;
