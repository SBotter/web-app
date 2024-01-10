import React from "react";
import { Product } from "../hooks/useProducts";
import { Card, CardBody, Heading, Image } from "@chakra-ui/react";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <Card borderRadius={10} overflow="hidden">
      <Image src={`/images/products/${product.picture[0].picturePath}`} />
      <CardBody>
        <Heading>{product.productName} </Heading>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
