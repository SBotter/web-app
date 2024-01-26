import "bootstrap/dist/css/bootstrap.css";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { BsCartXFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
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
  CardFooter,
  Heading,
  Spinner,
  Flex,
  useToast,
  Icon,
} from "@chakra-ui/react";

import { CartContext } from "./CartContext";
import { CartItem } from "./CartItem";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";

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
export interface CustomerAddress {
  street: string;
  unit: string;
  city: string;
  postalcode: string;
  province: string;
}

const FormCheckout = () => {
  const toast = useToast();
  const navigate = useNavigate();

  //cartItems
  const { cartItems, clearCart } = useContext(CartContext);
  const itemSubtotal = cartItems.reduce<number>((previous, current) => {
    return previous + current.price * current.quantity;
  }, 0);

  //delivery controll
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [isDelivery, setIsDelivery] = useState(false);
  const [isPickup, setIsPickup] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState("pickup");

  //payment type
  const [paymentType, setPaymentType] = useState("E-Transfer");

  //order number and order date
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const getOrderNumber = (): string => {
    const currentDate = new Date();

    const day = currentDate.getDate().toString().padStart(2, "0");
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
    const year = currentDate.getFullYear().toString().slice(-2);
    const hour = currentDate.getHours().toString().padStart(2, "0");
    const minute = currentDate.getMinutes().toString().padStart(2, "0");
    const second = currentDate.getSeconds().toString().padStart(2, "0");

    return `${day}${month}${year}-${hour}${minute}${second}`;
  };
  const orderNumber = getOrderNumber();

  const [customerAddress, setCustomerAddress] = useState<CustomerAddress>({
    street: "",
    unit: "",
    city: "",
    postalcode: "",
    province: "BC",
  });

  //form fields control
  const form = useRef<HTMLFormElement | any>("");
  const [customer, setCustomer] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    customer_street: "",
    customer_unit: "",
    customer_postalCode: "",
    customer_city: "",
    customer_province: "BC",
  });
  const [errors, setErrors] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    customer_street: "",
    customer_unit: "",
    customer_postalCode: "",
    customer_city: "",
    customer_province: "",
  });

  //google maps API
  const [directionsResponse, setDirectionsResponse] =
    useState<google.maps.DirectionsResult | null>(null);
  const [distanceValue, setDistanceValue] = useState(0);

  //CONSTANTS MESSAGES
  const DELIVERY_MESSAGE = "Delivery is FREE!";
  const DELIVERY_MESSAGE_FORM_ERROR =
    "Please provide all information of the delivery address";

  //MESSAGES HOOKS
  const [isDeliveryMessage, setDeliveryMessage] = useState(false);
  const [isDeliveryMessageFormError, setDeliveryMessageFormError] =
    useState(false);

  //button click to calculate de delivery fee
  const handleDeliveryCalculatorClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (
      event.currentTarget.getAttribute("button-calculate-deliver") === "true"
    ) {
      if (
        customerAddress.street === "" ||
        customerAddress.unit === "" ||
        customerAddress.city === "" ||
        customerAddress.postalcode === "" ||
        customerAddress.province === ""
      ) {
        setDeliveryMessageFormError(true);
      } else {
        setDeliveryMessageFormError(false);
        calculateRoute(customerAddress);
      }
    }
  };

  //Calculate the distance with google maps API
  const center = { lat: 49.3287158, lng: -123.0856023 };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env
      .VITE_REACT_APP_GOOGLE_MAPS_API_KEY as string,
  });

  if (!isLoaded) {
    <Spinner />;
  }

  //set the payment type
  const handlePaymentTypeClick = (buttonValue: string) => {
    setPaymentType(buttonValue);
  };

  //handle the freight calculator when the subtotal value is changed
  useEffect(() => {
    calculateFreight(Number(distanceValue), itemSubtotal);
  }, [itemSubtotal]);

  //handle the choice between pickup or delivery and persist the delivery fee
  useEffect(() => {
    if (deliveryMethod === "pickup") {
      setIsPickup(true);
      setIsDelivery(false);
      setDeliveryMessage(false);
      setDeliveryPrice(0);
      setDeliveryMessageFormError(false);
    }

    if (deliveryMethod === "delivery") {
      setIsPickup(false);
      setIsDelivery(true);
      calculateFreight(Number(distanceValue), itemSubtotal);
    }
  }, [deliveryMethod]);

  const cartTotal = (Number(deliveryPrice) + itemSubtotal).toFixed(2);

  async function calculateRoute(data: CustomerAddress) {
    const destination = `${data.unit} ${data.street}, ${data.city}, ${data.postalcode}, ${data.province}`;
    if (destination.replace(",", "") === "") {
      return;
    }

    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: import.meta.env.VITE_REACT_APP_ORIGIN_ADDRESS as string,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING,
    });

    setDirectionsResponse(results);
    let dist = 0;
    if (results && results.routes && results.routes[0].legs[0].distance) {
      dist = results.routes[0].legs[0].distance?.value;
      setDistanceValue(dist);
    }

    calculateFreight(Number(dist), itemSubtotal);
  }

  function calculateFreight(distanceValue: Number, newSubTotal: Number) {
    setDeliveryMessage(false);

    if (Number(newSubTotal) > 0) {
      const gasPrice = import.meta.env
        .VITE_REACT_APP_DELIVERY_GAS_PRICE as string;
      const deliveryRadious = import.meta.env
        .VITE_REACT_APP_DELIVERY_RADIOUS as string;
      const quilometerPerMeter = 8;
      const costPerMeter = Number(gasPrice) / quilometerPerMeter / 1000;
      const distanceFree = import.meta.env
        .VITE_REACT_APP_DELIVERY_DISTANCE_FREE as string;
      let orderDeliveryFree = "50";

      setDeliveryPrice(Math.round(Number(distanceValue) * costPerMeter * 5));

      //rules for delivery changed

      if (
        distanceValue &&
        Number(distanceValue) <= Number(distanceFree) &&
        Number(newSubTotal) >= Number(orderDeliveryFree)
      ) {
        setDeliveryPrice(0);
        setDeliveryMessage(true);
      } else if (
        distanceValue &&
        Number(distanceValue) > Number(distanceFree) &&
        Number(distanceValue) < 10000
      ) {
        orderDeliveryFree = "70";
        if (Number(newSubTotal) >= Number(orderDeliveryFree)) {
          setDeliveryPrice(0);
          setDeliveryMessage(true);
        }
      } else if (
        distanceValue &&
        Number(distanceValue) > 10000 &&
        Number(distanceValue) < Number(15000)
      ) {
        orderDeliveryFree = "100";
        if (Number(newSubTotal) >= Number(orderDeliveryFree)) {
          setDeliveryPrice(0);
          setDeliveryMessage(true);
        }
      } else if (
        distanceValue &&
        Number(distanceValue) > 15000 &&
        Number(distanceValue) < Number(deliveryRadious)
      ) {
        orderDeliveryFree = "140";
        if (Number(newSubTotal) >= Number(orderDeliveryFree)) {
          setDeliveryPrice(0);
          setDeliveryMessage(true);
        }
      }
    }
  }

  const validateForm = (e: FormEvent) => {
    e.preventDefault();

    let isValid = true;

    const newErrors = {
      customer_name: "",
      customer_email: "",
      customer_phone: "",
      customer_street: "",
      customer_unit: "",
      customer_postalCode: "",
      customer_city: "",
      customer_province: "",
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

    if (!isPickup) {
      if (customer.customer_street.trim() === "") {
        newErrors.customer_street = "Street is required";
        isValid = false;
      }

      if (customer.customer_unit.trim() === "") {
        newErrors.customer_unit = "Apartment/Unit is required";
        isValid = false;
      }

      if (customer.customer_postalCode.trim() === "") {
        newErrors.customer_postalCode = "Postal Code is required";
        isValid = false;
      }

      if (customer.customer_city.trim() === "") {
        newErrors.customer_city = "City is required";
        isValid = false;
      }

      if (customer.customer_postalCode.trim() === "") {
        newErrors.customer_postalCode = "Postalcode is required";
        isValid = false;
      }
    }

    setErrors(newErrors);

    if (isValid) {
      setCurrentDateTime(new Date());

      //Sent and Email with the order
      const loadingPromiseToastId = toast({
        title: "Sending Order",
        description: "Please wait...",
        status: "info",
        duration: null, // null duration makes it a persistent toast until explicitly closed
        isClosable: true,
        variant: "outline",
        render: ({ onClose }) => (
          <Box
            color="white"
            p={3}
            bg="base.800"
            borderRadius={10}
            onClick={onClose}
            cursor="pointer"
          >
            <Text fontWeight="bold" mb={2}>
              Sending Order
            </Text>
            <Text fontSize="sm">Please wait...</Text>
          </Box>
        ),
      });

      //emailJS service
      const emailSendingPromise = emailjs.sendForm(
        import.meta.env.VITE_REACT_APP_EMAIL_SERVICE_ID,
        import.meta.env.VITE_REACT_APP_EMAIL_TEMPLATE_ID_PEDIDO,
        form.current,
        import.meta.env.VITE_REACT_APP_EMAIL_PUBLIC_KEY
      );

      emailSendingPromise
        .then((result) => {
          if (result.status === 200) {
            toast.update(loadingPromiseToastId, {
              title: `Order #${orderNumber} Sent Successfully!`,
              description: "Thank you! We will contact you soon!",
              status: "success",
              duration: 8000, // Set a duration for the success toast
            });
            //clear cart
            clearCart();
            navigate("/order-success");
          }
        })
        .catch((error) => {
          // Close loading toast
          toast.close(loadingPromiseToastId);

          // Display error toast
          toast({
            position: "bottom-right",
            render: () => (
              <Box color="white" p={3} bg="base.800" borderRadius={10}>
                {error.text}
              </Box>
            ),
          });
        });
    }
    return isValid;
  };

  return (
    <form ref={form} onSubmit={validateForm}>
      {/*order number */}
      <input
        key="order_number"
        type="hidden"
        id="order_number"
        name="order_number"
        value={orderNumber}
      />
      {/*order date */}
      <input
        key="order_date"
        type="hidden"
        id="order_date"
        name="order_date"
        value={currentDateTime.toLocaleString()}
      />

      <SimpleGrid
        columns={{ base: 1, sm: 1, md: 2 }}
        width="100%"
        spacing={4}
        height={"100%"}
      >
        <Box width={"100%"}>
          <Box width={"100%"}>
            <Card bg="base.50" borderRadius={20}>
              <Heading paddingLeft={5} paddingTop={5} textColor={"base.800"}>
                Complete your order:
              </Heading>
              <CardBody width={"100%"}>
                <div className="mb-3">
                  {/*customer name */}
                  <input
                    placeholder="Name"
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
                  {/*customer e-mail */}
                  <input
                    placeholder="Email"
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
                  {/*customer phone */}
                  <input
                    placeholder="Mobile"
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
                <Heading textColor={"base.800"} fontSize={20}>
                  Address:
                </Heading>
                {isDeliveryMessageFormError && (
                  <Box>
                    <Text color="red">{DELIVERY_MESSAGE_FORM_ERROR}</Text>
                  </Box>
                )}
                <div style={{ display: "flex", gap: "10px" }}>
                  <div className="mb-3" style={{ width: "70%" }}>
                    {/*customer address street */}
                    <input
                      placeholder="Street"
                      id="customer_street"
                      name="customer_street"
                      className={`form-control ${
                        errors.customer_street ? "is-invalid" : ""
                      }`}
                      onChange={(event) => {
                        setCustomerAddress({
                          ...customerAddress,
                          street: event.target.value,
                        });
                        setCustomer({
                          ...customer,
                          customer_street: event.target.value,
                        });
                      }}
                      value={customer.customer_street}
                    />
                    {errors.customer_street && (
                      <div className="invalid-feedback">
                        {errors.customer_street}
                      </div>
                    )}
                  </div>
                  <div className="mb-3" style={{ width: "30%" }}>
                    {/*customer address unit */}
                    <input
                      placeholder="Apatment/Unit"
                      id="customer_unit"
                      name="customer_unit"
                      className={`form-control ${
                        errors.customer_unit ? "is-invalid" : ""
                      }`}
                      onChange={(event) => {
                        setCustomerAddress({
                          ...customerAddress,
                          unit: event.target.value,
                        });
                        setCustomer({
                          ...customer,
                          customer_unit: event.target.value,
                        });
                      }}
                      value={customer.customer_unit}
                    />
                    {errors.customer_unit && (
                      <div className="invalid-feedback">
                        {errors.customer_unit}
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <div className="mb-3" style={{ width: "30%" }}>
                    {/*customer address postalcode */}
                    <input
                      placeholder="Postalcode"
                      id="customer_postalCode"
                      name="customer_postalCode"
                      className={`form-control ${
                        errors.customer_postalCode ? "is-invalid" : ""
                      }`}
                      onChange={(event) => {
                        setCustomerAddress({
                          ...customerAddress,
                          postalcode: event.target.value,
                        });
                        setCustomer({
                          ...customer,
                          customer_postalCode: event.target.value,
                        });
                      }}
                      value={customer.customer_postalCode}
                    />
                    {errors.customer_street && (
                      <div className="invalid-feedback">
                        {errors.customer_postalCode}
                      </div>
                    )}
                  </div>
                  <div className="mb-3" style={{ width: "50%" }}>
                    {/*customer address city */}
                    <input
                      placeholder="City"
                      id="customer_city"
                      name="customer_city"
                      className={`form-control ${
                        errors.customer_city ? "is-invalid" : ""
                      }`}
                      onChange={(event) => {
                        setCustomerAddress({
                          ...customerAddress,
                          city: event.target.value,
                        });
                        setCustomer({
                          ...customer,
                          customer_city: event.target.value,
                        });
                      }}
                      value={customer.customer_city}
                    />
                    {errors.customer_city && (
                      <div className="invalid-feedback">
                        {errors.customer_city}
                      </div>
                    )}
                  </div>
                  <div className="mb-3" style={{ width: "20%" }}>
                    {/*custmer address province */}
                    <input
                      placeholder="BC"
                      id="customer_province"
                      name="customer_province"
                      className={`form-control ${
                        errors.customer_province ? "is-invalid" : ""
                      }`}
                      onChange={(event) => {
                        setCustomerAddress({
                          ...customerAddress,
                          province: event.target.value,
                        });
                        setCustomer({
                          ...customer,
                          customer_province: event.target.value,
                        });
                      }}
                      value={
                        customer.customer_province
                          ? customer.customer_province
                          : "BC"
                      }
                    />
                    {errors.customer_province && (
                      <div className="invalid-feedback">
                        {errors.customer_province}
                      </div>
                    )}
                  </div>
                </div>

                <SimpleGrid
                  columns={{ base: 1, sm: 1, md: 2 }}
                  justifyContent={"space-evenly"}
                  textAlign={"center"}
                  width={"100%"}
                >
                  <Box textAlign="center">
                    {/*delivery checkbox control */}
                    <input
                      id="delivery_checkbox"
                      name="delivery_checkbox"
                      type="checkbox"
                      className="form-check-input form-label"
                      onChange={() => {
                        setDeliveryMethod("delivery");
                      }}
                      checked={isDelivery}
                    />
                    <label
                      htmlFor="delivery_checkbox"
                      className="form-check-label ms-2 form-label"
                    >
                      Require Delivery
                    </label>
                  </Box>
                  <Box textAlign="center">
                    {/*pickup checkbox control */}
                    <input
                      id="delivery_pickup"
                      name="delivery_pickup"
                      type="checkbox"
                      className="form-check-input form-label"
                      onChange={() => {
                        setDeliveryMethod("pickup");
                      }}
                      checked={isPickup}
                    />
                    <label
                      htmlFor="delivery_pickup"
                      className="form-check-label ms-2 form-label"
                    >
                      Order Pickup
                    </label>
                  </Box>
                </SimpleGrid>
                {/*order delivery hidden field - order email*/}
                <input
                  key="order_delivery"
                  type="hidden"
                  id="order_delivery"
                  name="order_delivery"
                  value={isDelivery ? "Delivery" : "Customer Pick up"}
                />

                {isDelivery && (
                  <>
                    <Flex justifyContent={"center"} width={"50%"}>
                      <Button
                        marginBottom={5}
                        variant="outline"
                        bgColor="base.50"
                        borderColor={"base.800"}
                        color={"base.800"}
                        borderWidth="2"
                        leftIcon={
                          <i className="fa-solid fa-truck-monster product-detail-icon-link" />
                        }
                        _hover={{
                          bg: "base.800", // Change background color on hover
                          color: "base.50", // Change text color on hover
                          borderColor: "base.800",
                        }}
                        onClick={(event) =>
                          handleDeliveryCalculatorClick(event)
                        }
                        button-calculate-deliver="true"
                      >
                        Calculate Delivery
                      </Button>
                    </Flex>

                    <Box
                      height={"400px"}
                      borderWidth={1}
                      borderColor={"base.800"}
                    >
                      <GoogleMap
                        center={center}
                        zoom={15}
                        mapContainerStyle={{ width: "100%", height: "100%" }}
                        options={{
                          zoomControl: false,
                          streetViewControl: false,
                          mapTypeControl: false,
                          fullscreenControl: false,
                        }}
                      >
                        <Marker position={center} />
                        {directionsResponse && (
                          <DirectionsRenderer directions={directionsResponse} />
                        )}
                      </GoogleMap>
                    </Box>
                  </>
                )}
              </CardBody>
            </Card>
          </Box>
          <Box width={"100%"} paddingTop={5}>
            <Card bg="base.50" width={"100%"} borderRadius={20}>
              <CardBody>
                <VStack>
                  <Text color="base.800" fontSize={"20px"}>
                    Payment Method
                  </Text>
                  <Text color="base.800" fontSize={"13px"} marginTop={-5}>
                    The payment is done upon delivery. Choose payment method:
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
                        bgColor={
                          paymentType === item.text ? "base.800" : "base.50"
                        }
                        borderColor={"base.800"}
                        color={
                          paymentType === item.text ? "base.50" : "base.800"
                        }
                        borderWidth="2"
                        leftIcon={<i className={item.icon} />}
                        _hover={{
                          bg: "base.800", // Change background color on hover
                          color: "base.50", // Change text color on hover
                          borderColor: "base.800",
                        }}
                        onClick={() => handlePaymentTypeClick(item.text)}
                      >
                        {item.text}
                      </Button>
                    ))}
                    {/*order payment type hidden field - order email*/}
                    <input
                      key="payment_method"
                      type="hidden"
                      id="payment_method"
                      name="payment_method"
                      value={paymentType}
                    />
                  </SimpleGrid>
                </VStack>
              </CardBody>
            </Card>
          </Box>
        </Box>
        <Box width={"100%"} height={"100%"}>
          <Card bg="base.50" borderRadius={20} height={"100%"}>
            <Heading paddingLeft={5} paddingTop={5} textColor={"base.800"}>
              Your Cart:
            </Heading>
            <CardBody width={"100%"}>
              {cartItems.length == 0 && (
                <>
                  <Box
                    width={"100%"}
                    padding={2}
                    borderRadius={20}
                    borderWidth={1}
                    borderColor={"base.800"}
                    bg="#FFF"
                  >
                    <HStack
                      width={"100%"}
                      justifyContent={"center"}
                      verticalAlign={"center"}
                    >
                      <Flex justifyContent={"center"} width={"100%"}>
                        <Icon
                          as={BsCartXFill}
                          boxSize={"40px"}
                          color="base.800"
                        />
                        <Text
                          marginLeft={5}
                          marginTop={1}
                          color="base.800"
                          fontSize="20px"
                          verticalAlign={"center"}
                        >
                          Sorry! Your cart is empty!
                        </Text>
                      </Flex>
                    </HStack>
                  </Box>
                </>
              )}
              {cartItems.map((cartItem) => (
                <CartItem key={cartItem.packageId} {...cartItem} />
              ))}
              <div id="cartItems" className="mb-3" style={{ display: "none" }}>
                {cartItems.map((cartItem, index) => (
                  <>
                    {/*list of products hidden field - order email
                    
                    Product Name*/}
                    <input
                      key={`ProdName_${index}`}
                      type="hidden"
                      id={`cartItem_productName_${index}`}
                      name={`cartItem_productName_${index}`}
                      value={cartItem.name}
                    />
                    {/*list of products hidden field - order email
                    
                    Package Name*/}
                    <input
                      key={`PackName_${index}`}
                      type="hidden"
                      id={`cartItem_packageName_${index}`}
                      name={`cartItem_packageName_${index}`}
                      value={`${cartItem.packageName} - ${cartItem.packageSize} - ${cartItem.packageUnit}`}
                    />
                    {/*list of products hidden field - order email
                    
                    Quantity*/}
                    <input
                      key={`ProdQtd_${index}`}
                      type="hidden"
                      id={`cartItem_quantity_${index}`}
                      name={`cartItem_quantity_${index}`}
                      value={cartItem.quantity}
                    />
                  </>
                ))}
              </div>
            </CardBody>
            <CardFooter>
              <VStack width={"100%"}>
                <Box width={"100%"}>
                  <Divider background={"base.800"} />
                </Box>
                <VStack width={"100%"}>
                  <HStack width={"100%"}>
                    <Box width={"80%"} textAlign={"right"}>
                      <Text
                        color="base.800"
                        fontSize={20}
                        fontWeight={"bold"}
                        marginTop={3}
                      >
                        Items Sub Total:
                      </Text>
                    </Box>

                    <Box>
                      <i className="fa-solid fa-dollar-sign product-detail-icon-link" />
                    </Box>
                    <Box>
                      <Text
                        color="base.800"
                        fontSize={20}
                        fontWeight={"bold"}
                        marginTop={3}
                      >
                        {itemSubtotal.toFixed(2)}
                      </Text>
                      {/*order subtotal hidden field - order email*/}
                      <input
                        key="order_subTotal"
                        type="hidden"
                        id="order_subTotal"
                        name="order_subTotal"
                        value={`$${itemSubtotal.toFixed(2)}`}
                      />
                    </Box>
                  </HStack>
                  <HStack width={"100%"}>
                    <Box width={"80%"} textAlign={"right"}>
                      <Text
                        color="base.800"
                        fontSize={20}
                        fontWeight={"bold"}
                        marginTop={3}
                      >
                        Delivery:
                      </Text>
                    </Box>

                    <Box>
                      <i className="fa-solid fa-dollar-sign product-detail-icon-link" />
                    </Box>
                    <Box>
                      <Text
                        color="base.800"
                        fontSize={20}
                        fontWeight={"bold"}
                        marginTop={3}
                      >
                        {Number(deliveryPrice).toFixed(2)}
                      </Text>
                      {/*order delivery fee hidden field - order email*/}
                      <input
                        key="order_delivery_value"
                        type="hidden"
                        id="order_delivery_value"
                        name="order_delivery_value"
                        value={`$${Number(deliveryPrice).toFixed(2)}`}
                      />
                    </Box>
                  </HStack>
                  {isDeliveryMessage && (
                    <Box
                      width={"80%"}
                      textAlign={"right"}
                      marginTop={-6}
                      marginLeft={-10}
                    >
                      <Text color="red">{DELIVERY_MESSAGE}</Text>
                    </Box>
                  )}
                  <HStack width={"100%"}>
                    <Box width={"80%"} textAlign={"right"}>
                      <Text
                        color="base.800"
                        fontSize={20}
                        fontWeight={"bold"}
                        marginTop={3}
                      >
                        TOTAL:
                      </Text>
                    </Box>

                    <Box>
                      <i className="fa-solid fa-dollar-sign product-detail-icon-link" />
                    </Box>
                    <Box>
                      <Text
                        color="base.800"
                        fontSize={20}
                        fontWeight={"bold"}
                        marginTop={3}
                      >
                        {cartTotal}
                      </Text>
                    </Box>
                    {/*order total hidden field - order email*/}
                    <input
                      key="order_total"
                      type="hidden"
                      id="order_total"
                      name="order_total"
                      value={`$${cartTotal}`}
                    />
                  </HStack>

                  <Box width={"100%"}>
                    <Divider background={"base.800"} />
                  </Box>
                  <Box width={"100%"} textAlign={"center"}>
                    <Button
                      isDisabled={cartItems.length > 0 ? false : true}
                      type="submit"
                      width={"80%"}
                      variant="outline"
                      bgColor="base.50"
                      borderColor={"base.800"}
                      color={"base.800"}
                      borderWidth="2"
                      leftIcon={
                        <i className="fa-solid fa-arrow-up-right-from-square" />
                      }
                      _hover={{
                        bg: "base.800",
                        color: "base.50",
                        borderColor: "base.800",
                      }}
                    >
                      Confirm your Order
                    </Button>
                  </Box>
                </VStack>
              </VStack>
            </CardFooter>
          </Card>
        </Box>
      </SimpleGrid>
    </form>
  );
};

export default FormCheckout;
