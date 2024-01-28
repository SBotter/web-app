import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Box,
  Button,
  Flex,
  HStack,
  SkeletonText,
  Text,
  useBreakpointValue,
  Divider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Input,
} from "@chakra-ui/react";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { MutableRefObject, useRef, useState } from "react";
import DeliveryCalculator from "./DeliveryCalculator";

const center = { lat: 49.3287158, lng: -123.0856023 };

function Map() {
  const isWrapEnabled = useBreakpointValue({ base: true, md: false });

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env
      .VITE_REACT_APP_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  //const [map, setMap] = useState<google.maps.Map>(/** @type google.maps.Map */ null);
  const [map, setMap] = useState<google.maps.Map>();
  const [directionsResponse, setDirectionsResponse] =
    useState<google.maps.DirectionsResult | null>(null);

  const [distance, setDistance] = useState<string | null>(null);

  const [duration, setDuration] = useState("");
  const [distanceValue, setDistanceValue] = useState(0);
  const [showFreight, setShowFreight] = useState(false);

  //accordion
  const [isOpen, setIsOpen] = useState(true);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  console.log(map);

  /** @type React.MutableRefObject<HTMLInputElement> */
  //const originRef = useRef();

  /** @type React.MutableRefObject<HTMLInputElement> */
  //const destiantionRef = useRef<HTMLInputElement>(null);
  const destinationRef = useRef() as MutableRefObject<HTMLInputElement>;

  if (!isLoaded) {
    return <SkeletonText />;
  }

  async function calculateRoute() {
    //originRef = process.env.REACT_APP_ORIGIN_ADDRESS;
    //if (originRef.current.value === "" || destiantionRef.current.value === "") {
    if (destinationRef.current.value === "") {
      return;
    }

    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      //origin: originRef.current.value,
      origin: import.meta.env.VITE_REACT_APP_ORIGIN_ADDRESS as string,
      destination: destinationRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });

    setDirectionsResponse(results);
    if (results && results.routes && results.routes[0].legs[0].distance) {
      setDistance(results.routes[0].legs[0].distance.text);
      setDistanceValue(results.routes[0].legs[0].distance.value);
    }
    if (results && results.routes[0].legs[0].duration) {
      setDuration(results.routes[0].legs[0].duration.text);
    }
    setShowFreight(true);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance(null);
    setDistanceValue(0);
    setDuration("");
    setShowFreight(false);
    //originRef.current.value = "";
    destinationRef.current.value = "";
  }

  return (
    <Flex
      position="relative"
      flexDirection="column"
      alignItems="center"
      h="100%"
      w="100%"
    >
      <Box position="absolute" left={0} top={0} h="100%" w="100%">
        {/* Google Map Box */}
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
      <Box padding={2}>
        <Card
          align="center"
          //width={{ base: "90%", md: "70%", xl: "50%" }}
          bgColor="base.100"
          opacity={0.9}
          shadow={"lg"}
          borderColor={"base.800"}
          borderWidth="2px"
        >
          <Accordion defaultIndex={[0]} width={"100%"} allowToggle>
            <AccordionItem width={"100%"}>
              <AccordionButton
                color="red"
                justifyContent={"right"}
                onClick={handleToggle}
              >
                <Box flex="1" textAlign={"center"}>
                  <i className="fa-solid fa-truck-monster product-detail-icon-link" />
                  <Text color="base.800">
                    {isOpen
                      ? "Calculate your Delivery"
                      : "Calculate your Delivery"}
                  </Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={0}>
                <CardHeader width="100%">
                  <HStack
                    wrap={isWrapEnabled ? "wrap" : "nowrap"}
                    marginTop={-6}

                    //maxW="md" // Adjust the maximum width based on your layout
                  >
                    <Autocomplete>
                      <Input
                        type="text"
                        placeholder="Delivery Address"
                        ref={destinationRef}
                        onFocus={clearRoute}
                        bgColor="base.300"
                        color="base.800"
                      />
                    </Autocomplete>
                    <Button
                      colorScheme="base"
                      type="submit"
                      onClick={calculateRoute}
                    >
                      Calculate Delivery
                    </Button>
                  </HStack>
                </CardHeader>
                <Divider
                  bgColor="base.800"
                  display={showFreight ? "block" : "none"}
                  marginTop={-2}
                />
                <CardBody
                  width="100%"
                  display={showFreight ? "block" : "none"}
                  marginTop={-5}
                >
                  <HStack width={"100%"} justifyContent="space-evenly">
                    <Box>
                      <HStack>
                        <i className="fa-solid fa-car product-detail-icon-link" />
                        <Text color="base.800">Distance: {distance}</Text>
                      </HStack>
                    </Box>
                    <Box>
                      <HStack>
                        <i className="fa-regular fa-clock product-detail-icon-link" />
                        <Text color="base.800">Duration: {duration}</Text>
                      </HStack>
                    </Box>
                  </HStack>
                </CardBody>
                <Divider
                  bgColor="base.800"
                  display={showFreight ? "block" : "none"}
                  marginTop={-5}
                />
                <CardFooter
                  width="100%"
                  display={showFreight ? "block" : "none"}
                  marginTop={-8}
                >
                  <Box marginTop={0}>
                    <DeliveryCalculator distance={Number(distanceValue)} />
                  </Box>
                </CardFooter>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Card>
      </Box>
    </Flex>
  );
}

export default Map;
