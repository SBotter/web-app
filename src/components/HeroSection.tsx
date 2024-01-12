import { Heading, Text } from "@chakra-ui/react";
import "./../index.css";

const HeroSection = () => {
  return (
    <>
      <div className="hero-container">
        <Heading>
          <Text
            color="base.50"
            fontSize={{ base: "20px", md: "50px", lg: "80px" }}
            align="center"
          >
            WELCOME TO
          </Text>
        </Heading>
        <Heading>
          <Text
            color="base.50"
            fontSize={{ base: "30px", md: "80px", lg: "100px" }}
            align="center"
          >
            MICHELE'S FRESH PASTA
          </Text>
        </Heading>

        <Text
          color="base.50"
          marginTop={10}
          fontSize={{ base: "15px", md: "30px", lg: "45px" }}
          align="center"
        >
          The Artisanal Delight of Handcrafted Pasta Perfection!
        </Text>
        <Text
          color="base.50"
          fontSize={{ base: "15px", md: "30px", lg: "45px" }}
          align="center"
        >
          Where passion meets pasta.
        </Text>
        <p></p>
      </div>
    </>
  );
};

export default HeroSection;
