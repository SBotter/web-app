import {
  Button,
  Card,
  CardBody,
  Divider,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";

const PAYMENT_OPTIONS = [
  {
    id: 1,
    text: "E-Transfer",
    icon: "fa-solid fa-money-bill-transfer",
  },
  {
    id: 2,
    text: "Cash",
    icon: "fa-solid fa-sack-dollar",
  },
];

const PaymentMethod = () => {
  return (
    <Card bg="base.50" width={"100%"} borderRadius={20}>
      <CardBody>
        <VStack>
          <Text color="base.800" fontSize={"20px"}>
            Payment Method
          </Text>
          <Divider background="base.800" />
          <SimpleGrid
            columns={{ base: 1, sm: 1, md: 2 }}
            spacing={4}
            justifyContent={"space-between"}
            width={"100%"}
          >
            {PAYMENT_OPTIONS.map((item) => (
              <Button
                key={item.id}
                variant="outline"
                bgColor="base.50"
                borderColor={"base.800"}
                color={"base.800"}
                borderWidth="2"
                leftIcon={<i className={item.icon} />}
                _hover={{
                  bg: "base.800", // Change background color on hover
                  color: "base.50", // Change text color on hover
                  borderColor: "base.800",
                }}
              >
                {item.text}
              </Button>
            ))}
          </SimpleGrid>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default PaymentMethod;
