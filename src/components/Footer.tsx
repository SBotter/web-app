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
import "../index.css";

const Footer = () => {
  return (
    <>
      <Box bg="base.100" marginTop={5}>
        <Divider bg="base.700" />
        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          spacing={10}
          padding={4}
          textAlign={"center"}
        >
          <VStack>
            <Text textColor="base.800" fontWeight="bold">
              Contact Us
            </Text>
            <i className="fa-brands fa-whatsapp product-detail-icon-link" />
            <Text textColor="base.800">+1 604 679-0898</Text>
            <Link to="/contact" target="_self">
              <i className="fa-regular fa-envelope product-detail-icon-link" />
              <Text color="base.800">michelespasta@gmail.com</Text>
            </Link>
            <Link
              to="https://www.instagram.com/micheles.pasta/"
              target="_blank"
            >
              <i className="fa-brands fa-instagram product-detail-icon-link" />
              <Text color="base.800">@micheles.pasta</Text>
            </Link>
          </VStack>

          <VStack>
            <Link to={"/delivery"}>
              <Box width={"100%"}>
                <i className="fa-solid fa-truck-monster product-detail-icon-link" />
                <Text textColor="base.800" fontWeight="bold">
                  WE DELIVER
                </Text>
              </Box>
            </Link>
          </VStack>

          <VStack>
            <Text textColor="base.800" fontWeight="bold">
              Social Media
            </Text>
            <HStack spacing={5}>
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
          <Image src="/images/PastaLogo.png" height="90px" />
          <Text textColor="base.700" fontSize="12px">
            copiryght© 2024
          </Text>
        </VStack>
      </Box>
    </>
  );
};

export default Footer;
