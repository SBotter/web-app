import { useState } from "react";
import useProducts from "../hooks/useProducts";
import ProductCard from "./ProductCard";
import { SimpleGrid, Text } from "@chakra-ui/react";

interface Props {
  filterValue: string;
}
const ProductList = ({ filterValue }: Props) => {
  const { data, error } = useProducts();
  const [filter] = useState(filterValue);

  return (
    <>
      {error && <Text>{error}</Text>}

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4} padding={4}>
        {data
          .sort((a, b) => (a.productGroupName > b.productGroupName ? 1 : -1))
          .filter((prod) => {
            return filter.toLowerCase() === ""
              ? prod
              : prod.productGroupName.toLowerCase().includes(filter);
          })
          .map((prod) => (
            <ProductCard key={prod.productId} product={prod} />
          ))}
      </SimpleGrid>
    </>
  );
};

export default ProductList;
