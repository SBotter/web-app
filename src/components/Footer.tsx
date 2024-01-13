import {
  Box,
  HStack,
  Text,
  VStack,
  Image,
  SimpleGrid,
  Divider,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { CiDeliveryTruck } from "react-icons/ci";
import "../index.css";

const Footer = () => {
  return (
    <>
      <Box bg="base.100" marginTop={5}>
        <Divider bg="base.700" />
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} padding={4}>
          <VStack>
            <Text textColor="base.700" fontWeight="bold">
              Contact Us
            </Text>
            <HStack>
              <Text textColor="base.700">+1 604 679-0998</Text>
              <Link className="social-icon-link whatsapp" to="" target="_blank">
                <i className="fa-brands fa-whatsapp" />
              </Link>
            </HStack>
            <Text textColor="base.700">contact@michelespasta.ca</Text>
          </VStack>

          <VStack>
            <Link to={"/delivery"}>
              <Box textAlign={"center"}>
                <CiDeliveryTruck
                  size="2em"
                  className="product-detail-delivery_cost"
                />
                <Text textColor="base.700" fontWeight="bold">
                  WE DELIVERY
                </Text>
              </Box>
            </Link>
          </VStack>

          <VStack>
            <Text textColor="base.700" fontWeight="bold">
              Social Media
            </Text>
            <HStack>
              <Link
                className="social-icon-link"
                to="http://www.facebook.com"
                target="_blank"
              >
                <i className="fab fa-facebook-f" />
              </Link>
              <Link
                className="social-icon-link"
                to="https://www.instagram.com/micheles.pasta/"
                target="_blank"
              >
                <i className="fab fa-instagram" />
              </Link>
              <Link className="social-icon-link" to="" target="_blank">
                <i className="fab fa-youtube" />
              </Link>
              <Link className="social-icon-link facebook" to="" target="_blank">
                <i className="fa-brands fa-whatsapp" />
              </Link>
            </HStack>
          </VStack>
        </SimpleGrid>
      </Box>
      <Box bg="base.100" padding={2}>
        <VStack>
          <Image src="/images/PastaLogo.png" height="50px" />
          <Text textColor="base.700" fontSize="10px">
            copiryght© 2023
          </Text>
        </VStack>
      </Box>
    </>
  );
};

export default Footer;
