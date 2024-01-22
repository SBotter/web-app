import "bootstrap/dist/css/bootstrap.css";
import { FormEvent, useContext, useRef, useState } from "react";

import {
  Box,
  Button,
  Text,
  Divider,
  SimpleGrid,
  Card,
  CardBody,
  VStack,
  HStack,
  Image,
  CardFooter,
} from "@chakra-ui/react";
import Map from "./Map";
import { CartContext } from "./CartContext";

const PAYMENT_OPTIONS = [
  {
    id: 1,
    text: "E-Transfer",
    icon: "fa-solid fa-money-bill-transfer",
  },
  {
    id: 2,
    text: "Cash",
    icon: "fa-solid fa-sack-dollar",
  },
];

const FormCheckout = () => {
  const { cartItems } = useContext(CartContext);

  const itemSubtotal = cartItems.reduce<number>((previous, current) => {
    return previous + current.price * current.quantity;
  }, 0);

  const form = useRef<HTMLFormElement | any>("");

  const [customer, setCustomer] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    customer_address: "",
  });

  const [errors, setErrors] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    customer_address: "",
  });

  const [isDelivery, setIsDelivery] = useState(false);

  const validateForm = (e: FormEvent) => {
    e.preventDefault();

    let isValid = true;
    const newErrors = {
      customer_name: "",
      customer_email: "",
      customer_phone: "",
      customer_address: "",
    };

    if (customer.customer_name.trim() === "") {
      newErrors.customer_name = "Name is required";
      isValid = false;
    }

    if (customer.customer_email.trim() === "") {
      newErrors.customer_email = "Email is required";
      isValid = false;
    } else {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(customer.customer_email)) {
        newErrors.customer_email = "Invalid email format";
        isValid = false;
      }
    }

    if (customer.customer_phone.trim() === "") {
      newErrors.customer_phone = "Mobile is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <SimpleGrid columns={{ base: 1, sm: 1, md: 2 }} width="100%" spacing={4}>
      <Box width={"100%"}>
        <Box width={"100%"}>
          <Card bg="base.50">
            <CardBody width={"100%"}>
              <form ref={form} onSubmit={validateForm}>
                <div className="mb-3">
                  <Text color="base.800">Name:</Text>
                  <input
                    id="customer_name"
                    name="customer_name"
                    type="text"
                    className={`form-control ${
                      errors.customer_name ? "is-invalid" : ""
                    }`}
                    onChange={(event) =>
                      setCustomer({
                        ...customer,
                        customer_name: event.target.value,
                      })
                    }
                    value={customer.customer_name}
                  />
                  {errors.customer_name && (
                    <div className="invalid-feedback">
                      {errors.customer_name}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <Text color="base.800">E-mail:</Text>
                  <input
                    id="customer_email"
                    name="customer_email"
                    type="email"
                    className={`form-control ${
                      errors.customer_email ? "is-invalid" : ""
                    }`}
                    onChange={(event) =>
                      setCustomer({
                        ...customer,
                        customer_email: event.target.value,
                      })
                    }
                    value={customer.customer_email}
                  />
                  {errors.customer_email && (
                    <div className="invalid-feedback">
                      {errors.customer_email}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <Text color="base.800">Mobile:</Text>
                  <input
                    id="customer_phone"
                    name="customer_phone"
                    className={`form-control ${
                      errors.customer_phone ? "is-invalid" : ""
                    }`}
                    onChange={(event) =>
                      setCustomer({
                        ...customer,
                        customer_phone: event.target.value,
                      })
                    }
                    value={customer.customer_phone}
                  />
                  {errors.customer_phone && (
                    <div className="invalid-feedback">
                      {errors.customer_phone}
                    </div>
                  )}
                </div>
                <Divider background="base.800" />
                <div className="mb-3">
                  <Box display="flex" alignItems="center">
                    <input
                      id="delivery_checkbox"
                      name="delivery_checkbox"
                      type="checkbox"
                      className="form-check-input form-label"
                      onChange={() => setIsDelivery(!isDelivery)}
                    />
                    <label
                      htmlFor="delivery_checkbox"
                      className="form-check-label ms-2 form-label"
                    >
                      Require Delivery
                    </label>
                  </Box>
                </div>

                {isDelivery && (
                  <>
                    <Box height={"400px"}>
                      <Map />
                    </Box>
                    <div className="mb-3">
                      <Text color="base.800">Address:</Text>
                      <input
                        id="delivery_address"
                        name="delivery_address"
                        type="text"
                        className="form-control"
                        onChange={(event) =>
                          setCustomer({
                            ...customer,
                            customer_address: event.target.value,
                          })
                        }
                        value={customer.customer_address || ""}
                      />
                    </div>
                  </>
                )}

                <Box textAlign="right">
                  <Button
                    bg="base.700"
                    variant="outline"
                    _hover={{ bg: "base.50", color: "base.700" }}
                    textColor={"base.50"}
                    type="submit"
                  >
                    Send Message
                  </Button>
                </Box>
              </form>
            </CardBody>
          </Card>
        </Box>
        <Box width={"100%"}>
          <Card bg="base.50">
            <CardBody width={"100%"}>
              <Card bg="base.50" width={"100%"} borderRadius={20}>
                <CardBody>
                  <VStack>
                    <Text color="base.800" fontSize={"20px"}>
                      Payment Method
                    </Text>
                    <Divider background="base.800" />
                    <SimpleGrid
                      columns={{ base: 1, sm: 1, md: 2 }}
                      spacing={4}
                      justifyContent={"space-between"}
                      width={"100%"}
                    >
                      {PAYMENT_OPTIONS.map((item) => (
                        <Button
                          key={item.id}
                          variant="outline"
                          bgColor="base.50"
                          borderColor={"base.800"}
                          color={"base.800"}
                          borderWidth="2"
                          leftIcon={<i className={item.icon} />}
                          _hover={{
                            bg: "base.800", // Change background color on hover
                            color: "base.50", // Change text color on hover
                            borderColor: "base.800",
                          }}
                        >
                          {item.text}
                        </Button>
                      ))}
                    </SimpleGrid>
                  </VStack>
                </CardBody>
              </Card>
            </CardBody>
          </Card>
        </Box>
      </Box>
      <Box width={"100%"}>
        <Card bg="base.50">
          <CardBody width={"100%"}>
            <VStack>
              {cartItems.map((cart) => (
                <HStack
                  width={"100%"}
                  padding={2}
                  borderRadius={20}
                  borderWidth={1}
                  borderColor={"base.800"}
                  bg=""
                >
                  <Box>
                    <Box
                      borderRadius="full"
                      borderWidth={1}
                      borderColor={"#base.800"}
                      bg="base.800"
                    >
                      <Box
                        borderRadius="full"
                        borderWidth={5}
                        borderColor={"#FFF"}
                      >
                        <Image
                          src={`/images/products/${cart.imageSrc}`}
                          boxSize={"80px"}
                          borderRadius="full"
                          objectFit={"cover"}
                        />
                      </Box>
                    </Box>
                  </Box>
                  <Box marginLeft={5} width={"60%"}>
                    <VStack align="start">
                      <Text
                        color="base.800"
                        fontSize={20}
                        fontWeight={"bold"}
                        marginTop={3}
                      >
                        {cart.name}
                      </Text>
                      <Text color="base.800" fontSize={15} marginTop={-5}>
                        {cart.quantity} {cart.packageUnit} {cart.packageSize}
                      </Text>
                    </VStack>
                  </Box>
                  <Box>
                    <HStack align="start">
                      <Box marginTop={4}>
                        <i className="fa-solid fa-dollar-sign product-detail-icon-link" />
                      </Box>
                      <Box>
                        <Text
                          color="base.800"
                          fontSize={20}
                          fontWeight={"bold"}
                          marginTop={3}
                        >
                          {cart.quantity * cart.price}
                        </Text>
                      </Box>
                    </HStack>
                  </Box>
                </HStack>
              ))}
            </VStack>
          </CardBody>
          <CardFooter>
            <VStack width={"100%"}>
              <Box width={"100%"}>
                <Divider background={"base.800"} />
              </Box>
              <HStack width={"100%"}>
                <Box width={"80%"} textAlign={"right"}>
                  Items Sub Total:
                </Box>

                <Box width={"20%"}>{itemSubtotal}</Box>
              </HStack>
            </VStack>
          </CardFooter>
        </Card>
      </Box>
    </SimpleGrid>
  );
};

export default FormCheckout;
