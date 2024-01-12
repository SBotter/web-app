import productsGroup from "../data/productsMenuDB";

export interface ProductGroup {
  productGroupId: string;
  productGroupName: string;
  productGroupDescription: string;
  productGroupImage: string;
  productGroupPath: string;
}

const useMenuList = () => ({
  data: productsGroup,
  isLoading: false,
  error: null,
});

export default useMenuList;
