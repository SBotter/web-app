import {
  Card,
  Image,
  Text,
  Heading,
  CardBody,
  Divider,
  CardFooter,
  Button,
} from "@chakra-ui/react";
import { GoSearch } from "react-icons/go";
import { Link, Link as RouterLink } from "react-router-dom";
import { ProductGroup } from "../hooks/useMenuList";

interface Props {
  product: ProductGroup;
}

const MenuCard = ({ product }: Props) => {
  return (
    <>
      <Card borderRadius={20} bg="#FFF" boxShadow="md">
        <Link to={`/${product.productGroupPath}`}>
          <Image
            src={`/images/products/${product.productGroupImage}`}
            objectFit="cover"
            height="350px"
            width="100%"
            borderTopLeftRadius={20}
            borderTopRightRadius={20}
            overflow="hidden"
            _hover={{
              transform: "scale(1.03)",
              transition: "transform .15s ease-in",
              borderRadius: 20,
            }}
          />
        </Link>
        <Heading
          marginTop={-12}
          marginLeft={2}
          bg="base.700"
          borderTopLeftRadius={20}
          borderBottomLeftRadius={20}
          opacity={0.8}
        >
          <Text fontSize={{ md: "30px" }} color="base.50" p={2}>
            {product.productGroupName}
          </Text>
        </Heading>
        <CardBody>
          <Text color="base.700">{product.productGroupDescription}</Text>
        </CardBody>
        <Divider borderColor="base.800" marginTop={-8} />
        <CardFooter margin="auto" marginTop={-5}>
          <Button
            as={RouterLink} // Use the Link component from react-router-dom
            to={`/${product.productGroupPath}`}
            leftIcon={<GoSearch />}
            colorScheme="base"
            variant="solid"
          >
            Find all options
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default MenuCard;
