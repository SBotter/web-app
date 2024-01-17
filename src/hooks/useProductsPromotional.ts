import products from "../data/promotionalProductsListDB";

export interface ProductPromo {
  productId: string;
  productDescription: string;
  productGroupName: string;
  picture: string;
  package: Package[];
}

export interface Package {
  packageId: string;
  packageName: string;
  packageSize: string;
}

const useProductsPromotional = () => ({
  data: products,
  isLoading: false,
  error: null,
});

export default useProductsPromotional;
