import {
  Heading,
  Text,
  Box,
  Card,
  CardBody,
  CardHeader,
} from "@chakra-ui/react";
import Footer from "../components/Footer";
import Map from "../components/Map";

const DeliveryPage = () => {
  return (
    <>
      <Box padding={5} boxSize={"100%"}>
        <Card borderRadius={20} bg="#FFF" boxShadow="md">
          <CardHeader>
            <Heading marginTop={10} marginBottom={10}>
              <Text
                color="base.700"
                fontSize={{ base: "30px", md: "50px", lg: "80px" }}
                align="center"
              >
                WE DELIVERY!
              </Text>
            </Heading>
          </CardHeader>
          <CardBody>
            <Box boxSize={"100%"}>
              <Map />
            </Box>
          </CardBody>
        </Card>
      </Box>

      <Footer />
    </>
  );
};

export default DeliveryPage;
