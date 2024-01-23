import "bootstrap/dist/css/bootstrap.css";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";

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

interface CustomerAddress {
  street: string;
  unit: string;
  city: string;
  postalcode: string;
  province: string;
}

const FormCheckout = () => {
  const [isDelivery, setIsDelivery] = useState(false);
  //Calculate the distance with google maps API
  const center = { lat: 49.3287158, lng: -123.0856023 };
  //const [map, setMap] = useState<google.maps.Map>();
  const [deliveryPrice, setDeliveryPrice] = useState(0);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env
      .VITE_REACT_APP_GOOGLE_MAPS_API_KEY as string,
  });

  if (!isLoaded) {
    return <Spinner />;
  }

  const [customerAddress, setCustomerAddress] = useState<CustomerAddress>({
    street: "",
    unit: "",
    city: "",
    postalcode: "",
    province: "BC",
  });

  /*
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setCustomerAddress({
      ...customerAddress,
      [event.target.name]: event.target.value,
    });
  };
  */

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      // Call the CalculateRoute function with the address form data
      if (
        customerAddress.street === "" ||
        customerAddress.unit === "" ||
        customerAddress.city === "" ||
        customerAddress.postalcode === "" ||
        customerAddress.province === ""
      ) {
        setIsDelivery(false);
        setMapMessage(
          "Please provide all information of the delivery address."
        );
      } else {
        setMapMessage("");
        calculateRoute(customerAddress);
        setIsDelivery(!isDelivery);
      }
    } else {
      setMapMessage("");
      setIsDelivery(false);
      clearRoute();
    }
  };

  function clearRoute() {
    setDirectionsResponse(null);
    setDistanceValue(0);
  }

  const [directionsResponse, setDirectionsResponse] =
    useState<google.maps.DirectionsResult | null>(null);
  const [mapMessage, setMapMessage] = useState("");
  const [deliveryMessage, setDeliveryMessage] = useState("");
  const [distanceValue, setDistanceValue] = useState(0);

  const { cartItems } = useContext(CartContext);

  const itemSubtotal = cartItems.reduce<number>((previous, current) => {
    return previous + current.price * current.quantity;
  }, 0);

  useEffect(() => {
    calculateFreight(Number(distanceValue), itemSubtotal);
  }, [itemSubtotal]);

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
      console.log(dist, "dist");
      setDistanceValue(dist);
      console.log(distanceValue, "distanceValue");
    }

    calculateFreight(Number(dist), itemSubtotal);
  }

  function calculateFreight(distanceValue: Number, newSubTotal: Number) {
    setDeliveryMessage("");

    console.log(distanceValue, "distanceValue - calculate");
    console.log(newSubTotal, "newSubTotal - calculate");

    const gasPrice = import.meta.env
      .VITE_REACT_APP_DELIVERY_GAS_PRICE as string;
    const deliveryRadious = import.meta.env
      .VITE_REACT_APP_DELIVERY_RADIOUS as string;
    const quilometerPerMeter = 8;
    const costPerMeter = Number(gasPrice) / quilometerPerMeter / 1000;
    const distanceFree = import.meta.env
      .VITE_REACT_APP_DELIVERY_DISTANCE_FREE as string;
    let orderDeliveryFree = "";

    setDeliveryPrice(Math.round(Number(distanceValue) * costPerMeter * 5));

    if (distanceValue && Number(distanceValue) <= Number(distanceFree)) {
      setDeliveryPrice(0);
      setDeliveryMessage("Delivery is FREE!");
    } else if (
      distanceValue &&
      Number(distanceValue) > Number(distanceFree) &&
      Number(distanceValue) < 10000
    ) {
      orderDeliveryFree = "70";
      if (Number(newSubTotal) >= Number(orderDeliveryFree)) {
        setDeliveryPrice(0);
        setDeliveryMessage("Delivery is FREE!");
      }
    } else if (
      distanceValue &&
      Number(distanceValue) > 10000 &&
      Number(distanceValue) < Number(15000)
    ) {
      orderDeliveryFree = "100";
      if (Number(newSubTotal) >= Number(orderDeliveryFree)) {
        setDeliveryPrice(0);
        setDeliveryMessage("Delivery is FREE!");
      }
    } else if (
      distanceValue &&
      Number(distanceValue) > 15000 &&
      Number(distanceValue) < Number(deliveryRadious)
    ) {
      orderDeliveryFree = "140";
      if (Number(newSubTotal) >= Number(orderDeliveryFree)) {
        setDeliveryPrice(0);
        setDeliveryMessage("Delivery is FREE!");
      }
    }
  }

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

    setErrors(newErrors);
    return isValid;
  };

  return (
    <form ref={form} onSubmit={validateForm}>
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
                <div style={{ display: "flex", gap: "10px" }}>
                  <div className="mb-3" style={{ width: "70%" }}>
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
                    <input
                      id="delivery_checkbox"
                      name="delivery_checkbox"
                      type="checkbox"
                      className="form-check-input form-label"
                      onChange={handleCheckboxChange}
                    />
                    <label
                      htmlFor="delivery_checkbox"
                      className="form-check-label ms-2 form-label"
                    >
                      Require Delivery{" "}
                      {mapMessage != "" && (
                        <p style={{ color: "red" }}>{mapMessage}</p>
                      )}
                    </label>
                  </Box>
                  <Box textAlign="center">
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
                      Order Pickup
                    </label>
                  </Box>
                </SimpleGrid>

                {isDelivery && (
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
          </Box>
        </Box>
        <Box width={"100%"} height={"100%"}>
          <Card bg="base.50" borderRadius={20} height={"100%"}>
            <CardBody width={"100%"}>
              {cartItems.map((cartItem) => (
                <CartItem key={cartItem.packageId} {...cartItem} />
              ))}
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
                    </Box>
                  </HStack>
                  {deliveryMessage != "" && (
                    <Box
                      width={"80%"}
                      textAlign={"right"}
                      marginTop={-6}
                      marginLeft={-10}
                    >
                      <Text color="base.800" size="15" fontWeight={"bold"}>
                        {deliveryMessage}
                      </Text>
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
                  </HStack>

                  <Box width={"100%"}>
                    <Divider background={"base.800"} />
                  </Box>
                  <Box width={"100%"} textAlign={"center"}>
                    <Button
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
                        bg: "base.800", // Change background color on hover
                        color: "base.50", // Change text color on hover
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
