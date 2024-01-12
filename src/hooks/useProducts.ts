import products from "../data/productsDB";

export interface Product {
  companyId: string;
  productId: string;
  productName: string;
  productDescription: string;
  category: Category[];
  productGroupName: string;
  picture: Picture[];
  package: Package[];
}

export interface Category {
  categoryId: string;
  categoryName: string;
}

export interface Picture {
  pictureId: string;
  picturePath: string;
}

export interface Package {
  packageId: string;
  packageName: string;
  packageDescription: string;
  packageUnit: string;
  packageSize: string;
  packagePrice: number;
}

const useProducts = () => ({ data: products, isLoading: false, error: null });

export default useProducts;
