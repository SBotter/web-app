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
import { FaSearchPlus } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
import { ProductGroup } from "../hooks/useMenuList";

interface Props {
  product: ProductGroup;
}

const MenuCard = ({ product }: Props) => {
  return (
    <>
      <Card borderRadius={20} bg="#FFF">
        <Image
          src={`/images/products/${product.productGroupImage}`}
          objectFit="cover"
          height="350px"
          width="auto"
          borderTopLeftRadius={20}
          borderTopRightRadius={20}
          overflow="hidden"
          _hover={{
            transform: "scale(1.03)",
            transition: "transform .15s ease-in",
            borderRadius: 20,
          }}
        />
        <Heading marginTop={-12} marginLeft={2}>
          {product.productGroupName}
        </Heading>
        <CardBody>
          <Text color="base.700">{product.productGroupDescription}</Text>
        </CardBody>
        <Divider borderColor="base.800" />
        <CardFooter margin="auto">
          <Button
            as={RouterLink} // Use the Link component from react-router-dom
            to={`/${product.productGroupPath}`}
            leftIcon={<FaSearchPlus />}
            colorScheme="base"
            variant="outline"
          >
            Find all options
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default MenuCard;
