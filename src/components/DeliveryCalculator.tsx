import { Text, HStack, Box, Center } from "@chakra-ui/react";

interface Props {
  distance: number;
}

function DeliveryCalculator({ distance }: Props) {
  const gasPrice = import.meta.env.VITE_REACT_APP_DELIVERY_GAS_PRICE as string;
  const deliveryRadious = import.meta.env
    .VITE_REACT_APP_DELIVERY_RADIOUS as string;
  const quilometerPerMeter = 8;
  const costPerMeter = Number(gasPrice) / quilometerPerMeter / 1000;
  const distanceFree = import.meta.env
    .VITE_REACT_APP_DELIVERY_DISTANCE_FREE as string;
  let orderDeliveryFree = "30";

  let deliveryPrice = Math.round(distance * costPerMeter * 5);

  if (
    distance &&
    distance <= Number(distanceFree) &&
    deliveryPrice >= Number(orderDeliveryFree)
  ) {
    //deliveryPrice = 0;
    orderDeliveryFree = "30";
  } else if (distance && distance > Number(distanceFree) && distance < 10000) {
    orderDeliveryFree = "70";
  } else if (distance && distance > 10000 && distance < 15000) {
    orderDeliveryFree = "100";
  } else if (
    distance &&
    distance > 15000 &&
    distance < Number(deliveryRadious)
  ) {
    orderDeliveryFree = "140";
  }

  if (distance && distance > Number(deliveryRadious))
    return (
      <Center>
        <Box width="50%" marginLeft={5}>
          <Text color="base.800" textAlign={"center"}>
            Sorry! We do not offer delivery services for locations that are too
            distant from our current operational range, but we are open to
            making special arrangements; please feel free to contact us for
            further assistance.
          </Text>
        </Box>
      </Center>
    );

  if (distance && distance === 0) return null;

  return (
    <>
      <HStack width={"100%"} justifyContent="space-evenly">
        <Box width="100%" textAlign={"right"}>
          <Text color="base.800">Delivery Costs:</Text>
        </Box>
        <Box width="100%" marginLeft={5}>
          <Text color="base.800">
            {deliveryPrice > 0 && (
              <i className="fa-solid fa-dollar-sign product-detail-delivery_cost" />
            )}{" "}
            {deliveryPrice}
          </Text>
        </Box>
      </HStack>
      <Text color="base.800" textAlign={"center"}>
        {deliveryPrice > 0 && "Enjoy Free Delivery on Orders Over $"}
        {orderDeliveryFree}
      </Text>
    </>
  );
}

export default DeliveryCalculator;
