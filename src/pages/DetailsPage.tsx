import { Box, Card, CardBody } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import ProductDetailFilter from "../components/ProductDetailFilter";

const DetailsPage = () => {
  const { filterValue } = useParams();

  if (filterValue == null) return;

  return (
    <>
      <Box padding={{ base: 1, sm: 1, md: 4 }} boxSize={"100%"}>
        <Card borderRadius={20} bg="#FFF" boxShadow="md" p={0}>
          <CardBody>
            <ProductDetailFilter filterValue={filterValue} />
          </CardBody>
        </Card>
      </Box>
      <Footer />
    </>
  );
};

export default DetailsPage;
