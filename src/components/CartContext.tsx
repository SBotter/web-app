import { ReactNode, createContext, useEffect, useState } from "react";
import { LOCAL_STORAGE_CART_KEY } from "../constants/constants";
import toast from "react-hot-toast";

interface CartItem {
  productId: string;
  packageId: string;
  packageName: string;
  packageUnit: string;
  packageSize: string;
  name: string;
  price: number;
  quantity: number;
  imageSrc: string;
  categoryName: string;
}

interface AddressType {
  street: string;
  unit?: string;
  postcode: string;
  city: string;
  province: string;
}

interface CartContextType {
  cartItems: CartItem[];
  //cartProductItems: CartProductItem[];
  address?: AddressType;
  paymentMethod?: PaymentMethodType;
  addItemToCart: (item: CartItem) => void;
  removeItemFromCart: (item: CartItem) => void;
  updateItemFromCart: (item: CartItem) => void;
  updateAddress: (address: AddressType) => void;
  updatePaymentMethod: (method: PaymentMethodType) => void;
  clearCart: () => void;
}

type PaymentMethodType = "creditCard" | "debitCard" | "cash";

interface CartContextProviderProps {
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextType);

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [address, setAddress] = useState<AddressType>({
    street: "",
    postcode: "",
    city: "",
    province: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>();

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const localStorageCart = localStorage.getItem(LOCAL_STORAGE_CART_KEY);

    if (localStorageCart) {
      return JSON.parse(localStorageCart);
    }

    /*
    return [
      {
        productId: "1",
        packageId: "1",
        packageName: "Package Name",
        packageUnit: "pkg",
        packageSize: "150g",
        name: "Pasta Traditional",
        price: 29,
        quantity: 1,
        imageSrc: "public/images/products/ravioli_1.jpg",
        categoryName: "pasta",
      },
    ];
    */
  });

  function addItemToCart(item: CartItem) {
    const existingItem = cartItems.find((c) => c.packageId === item.packageId);

    if (existingItem) {
      existingItem.quantity = item.quantity;
      updateItemFromCart(existingItem);
      toast.success(
        `${existingItem.name} updated to ${existingItem.quantity}!`
      );
    } else {
      setCartItems((previousItems) => [...previousItems, item]);
      toast.success(`${item.quantity} ${item.name} added to the cart!`);
    }
  }

  function removeItemFromCart(item: CartItem) {
    const itemIndex = cartItems.findIndex(
      (c) => c.packageId === item.packageId
    );

    setCartItems((previousItems) => [
      ...previousItems.slice(0, itemIndex),
      ...previousItems.slice(itemIndex + 1, previousItems.length),
    ]);
  }

  function updateItemFromCart(item: CartItem) {
    const itemIndex = cartItems.findIndex(
      (c) => c.packageId === item.packageId
    );

    setCartItems((previousItems) => [
      ...previousItems.slice(0, itemIndex),
      item,
      ...previousItems.slice(itemIndex + 1, previousItems.length),
    ]);
  }

  function updatePaymentMethod(method: PaymentMethodType) {
    setPaymentMethod(method);
  }

  function updateAddress(address: AddressType) {
    setAddress(address);
  }

  function clearCart() {
    setCartItems([]);
  }

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        removeItemFromCart,
        updateItemFromCart,
        paymentMethod,
        updatePaymentMethod,
        address,
        updateAddress,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
