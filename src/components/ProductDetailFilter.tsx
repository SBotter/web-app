import { useState } from "react";
import useProducts from "../hooks/useProducts";
import ProductDetail from "./ProductDetail";
import { Box } from "@chakra-ui/react";

interface Props {
  filterValue: string;
}
const ProductDetailFilter = ({ filterValue }: Props) => {
  const { data } = useProducts();
  const [filter] = useState(filterValue);
  return (
    <Box padding={0}>
      {data
        .filter((prod) => {
          return filter.toLowerCase() === ""
            ? prod
            : prod.productId.toLowerCase().includes(filter);
        })
        .map((prod) => (
          <ProductDetail key={prod.productId} product={prod} />
        ))}
    </Box>
  );
};

export default ProductDetailFilter;
