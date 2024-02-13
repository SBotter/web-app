import {
  SimpleGrid,
  Text,
  VStack,
  Heading,
  HStack,
  Box,
} from "@chakra-ui/react";
import FormContact from "../components/FormContact";
import Footer from "../components/Footer";

const ContactPage = () => {
  return (
    <>
      <VStack>
        <Heading marginTop={10} marginBottom={10} p={5}>
          <Text
            color="base.700"
            fontSize={{ base: "20px", md: "30px", lg: "50px" }}
            align="center"
          >
            Connecting Beyond Boundaries: Reach Out to Us for Inquiries,
            Collaborations, or Just a Friendly Chat!
          </Text>
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} p={5} spacing={5} width="100%">
          <Box
            bg="base.200"
            borderRadius={20}
            width="100%"
            padding={4}
            textAlign={"center"}
          >
            <VStack>
              <Box bg="base.50" width="100%" padding={4}>
                <i className="fa-regular fa-envelope product-detail-icon-link" />
                <Text color="base.800">michelespasta@gmail.com</Text>
              </Box>
              <Box bg="base.50" width="100%" padding={4}>
                <HStack justifyContent={"center"}>
                  <i className="fa-brands fa-whatsapp product-detail-icon-link" />
                  <i className="fa-solid fa-phone product-detail-icon-link" />
                </HStack>
                <VStack>
                  <Text color="base.800" marginTop={2}>
                    +1 778 838-2564
                  </Text>
                  <Text color="base.800" marginTop={-5}>
                    +1 604 679-0898
                  </Text>
                </VStack>
              </Box>
              <Box bg="base.50" width="100%" padding={4}>
                <i className="fa-brands fa-instagram product-detail-icon-link" />
                <Text color="base.800">@micheles.pasta</Text>
              </Box>
            </VStack>
          </Box>

          <Box bg="base.200" borderRadius={20} width="100%" padding={4}>
            <FormContact />
          </Box>
        </SimpleGrid>
      </VStack>
      <Footer />
    </>
  );
};

export default ContactPage;
