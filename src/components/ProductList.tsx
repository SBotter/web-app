import React from "react";
import useProducts from "../hooks/useProducts";
import ProductCard from "./ProductCard";
import { SimpleGrid, Text } from "@chakra-ui/react";

const ProductList = () => {
  const { data, error } = useProducts();
  return (
    <>
      {error && <Text>{error}</Text>}
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
        spacing={4}
        padding={4}
      >
        {data.map((prod) => (
          <ProductCard key={prod.productId} product={prod} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default ProductList;
