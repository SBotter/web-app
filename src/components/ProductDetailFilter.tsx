import { useState } from "react";
import useProducts from "../hooks/useProducts";
import ProductDetail from "./ProductDetail";

interface Props {
  filterValue: string;
}
const ProductDetailFilter = ({ filterValue }: Props) => {
  const { data } = useProducts();
  const [filter] = useState(filterValue);
  return (
    <div>
      {data
        .filter((prod) => {
          return filter.toLowerCase() === ""
            ? prod
            : prod.productId.toLowerCase().includes(filter);
        })
        .map((prod) => (
          <ProductDetail product={prod} />
        ))}
    </div>
  );
};

export default ProductDetailFilter;
