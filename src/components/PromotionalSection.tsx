import { Button, Heading, Text } from "@chakra-ui/react";
import "./../index.css";
import { Link as RouterLink } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import MenuPromoList from "./MenuPromoList";

const PromotionalSection = () => {
  return (
    <>
      <div className="hero-container">
        <Heading>
          <Text
            color="base.50"
            fontSize={{ base: "25px", sm: "30px", md: "35px", lg: "70px" }}
            align="center"
          >
            VALENTINE'S DAY
          </Text>
        </Heading>
        <Text
          color="base.50"
          marginTop={10}
          fontSize={{ base: "10px", sm: "12px", md: "20px", lg: "25px" }}
          align="center"
        >
          Surprise your love with our exclusive handmade fresh pasta basket!
          Elevate your culinary style this Valentine's Day. Craft something
          special together for unforgettable moments. Embrace the unexpected
          with our unique pasta experience!
        </Text>
        <Text
          color="base.50"
          fontSize={{ base: "10px", sm: "12px", md: "20px", lg: "25px" }}
          align="center"
        >
          Where passion meets pasta.
        </Text>
        <div className="promotional-price">
          <Heading>
            <Text
              textAlign={"center"}
              color="base.50"
              fontSize={{ base: "20px", sm: "30px", md: "35px", lg: "70px" }}
            >
              $120.00
            </Text>
          </Heading>
          <Text
            marginTop={-5}
            color="base.50"
            fontSize={{ base: "8px", sm: "10px", md: "14px", lg: "16px" }}
          >
            * delivery service is complimentary for distances up to 20
            kilometers.
          </Text>
          <Button
            width={"100%"}
            variant="outline"
            as={RouterLink} // Use the Link component from react-router-dom
            to={"/contact"}
            leftIcon={<FaWhatsapp size="1.3em" />}
            bgColor="base.200"
            color={"base.800"}
            borderWidth="2"
            _hover={{
              bg: "base.50", // Change background color on hover
              color: "base.800", // Change text color on hover
              borderColor: "base.800",
            }}
          >
            Place you Order
          </Button>
        </div>
      </div>
      <div className="promotional-items-container">
        <div className="promotional-items">
          <MenuPromoList />
        </div>
      </div>
    </>
  );
};

export default PromotionalSection;
