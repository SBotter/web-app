import { Heading, Text } from "@chakra-ui/react";

import "./../index.css";

const PromotionalSection = () => {
  return (
    <>
      <div className="hero-container">
        <Heading>
          <Text
            color="base.50"
            fontSize={{ base: "50px", md: "80px", lg: "100px" }}
            align="center"
          >
            VALENTINE'S DAY
          </Text>
        </Heading>
        <Text
          color="base.50"
          marginTop={10}
          fontSize={{ base: "15px", md: "30px", lg: "45px" }}
          align="center"
        >
          Surprise your love with our exclusive handmade fresh pasta basket!
          Elevate your culinary style this Valentine's Day. Craft something
          special together for unforgettable moments. Embrace the unexpected
          with our unique pasta experience!
        </Text>
        <Text
          color="base.50"
          fontSize={{ base: "15px", md: "30px", lg: "45px" }}
          align="center"
        >
          Where passion meets pasta.
        </Text>
        <div className="promotional-price">
          <Heading>
            <Text
              color="base.50"
              fontSize={{ base: "50px", md: "80px", lg: "100px" }}
            >
              $120.00
            </Text>
          </Heading>
        </div>
      </div>
    </>
  );
};

export default PromotionalSection;
