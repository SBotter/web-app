import { Box, Card, CardBody, CardFooter } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import ProductDetailFilter from "../components/ProductDetailFilter";
import Map from "../components/Map";

const DetailsPage = () => {
  const { filterValue } = useParams();

  if (filterValue == null) return;

  return (
    <>
      <Box padding={5} boxSize={"100%"}>
        <Card borderRadius={20} bg="#FFF" boxShadow="md">
          <CardBody>
            <ProductDetailFilter filterValue={filterValue} />
          </CardBody>
          <CardFooter>
            <Box boxSize={"100%"}>
              <Map />
            </Box>
          </CardFooter>
        </Card>
      </Box>
      <Footer />
    </>
  );
};

export default DetailsPage;
