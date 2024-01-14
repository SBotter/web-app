import "bootstrap/dist/css/bootstrap.css";
import { FormEvent, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Box, Button, useToast, Text } from "@chakra-ui/react";

const FormContact = () => {
  const toast = useToast();

  const form = useRef<HTMLFormElement | any>("");

  const [message, setMessage] = useState({
    contact_name: "",
    contact_email: "",
    contact_message: "",
  });

  const [errors, setErrors] = useState({
    contact_name: "",
    contact_email: "",
    contact_message: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      contact_name: "",
      contact_email: "",
      contact_message: "",
    };

    if (message.contact_name.trim() === "") {
      newErrors.contact_name = "Name is required";
      isValid = false;
    }

    if (message.contact_email.trim() === "") {
      newErrors.contact_email = "Email is required";
      isValid = false;
    } else {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(message.contact_email)) {
        newErrors.contact_email = "Invalid email format";
        isValid = false;
      }
    }

    if (message.contact_message.trim() === "") {
      newErrors.contact_message = "Message is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const sendEmail = (e: FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const loadingPromiseToastId = toast({
        title: "Sending Email",
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
              Sending Email
            </Text>
            <Text fontSize="sm">Please wait...</Text>
          </Box>
        ),
      });

      const emailSendingPromise = emailjs.sendForm(
        import.meta.env.VITE_REACT_APP_EMAIL_SERVICE_ID,
        import.meta.env.VITE_REACT_APP_EMAIL_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_REACT_APP_EMAIL_PUBLIC_KEY
      );

      emailSendingPromise
        .then((result) => {
          if (result.status === 200) {
            toast.update(loadingPromiseToastId, {
              title: "Email Sent Successfully",
              description: "Thank you for reaching out!",
              status: "success",
              duration: 5000, // Set a duration for the success toast
            });

            // Clear form fields after successful submission
            setMessage({
              contact_name: "",
              contact_email: "",
              contact_message: "",
            });
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
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <div className="mb-3">
        <Text color="base.800">Name:</Text>
        <input
          id="contact_name"
          name="contact_name"
          type="text"
          className={`form-control ${errors.contact_name ? "is-invalid" : ""}`}
          onChange={(event) =>
            setMessage({ ...message, contact_name: event.target.value })
          }
          value={message.contact_name}
        />
        {errors.contact_name && (
          <div className="invalid-feedback">{errors.contact_name}</div>
        )}
      </div>
      <div className="mb-3">
        <Text color="base.800">E-mail:</Text>
        <input
          id="contact_email"
          name="contact_email"
          type="email"
          className={`form-control ${errors.contact_email ? "is-invalid" : ""}`}
          onChange={(event) =>
            setMessage({ ...message, contact_email: event.target.value })
          }
          value={message.contact_email}
        />
        {errors.contact_email && (
          <div className="invalid-feedback">{errors.contact_email}</div>
        )}
      </div>
      <div className="mb-3">
        <Text color="base.800">Message:</Text>
        <textarea
          id="contact_message"
          name="contact_message"
          className={`form-control ${
            errors.contact_message ? "is-invalid" : ""
          }`}
          onChange={(event) =>
            setMessage({ ...message, contact_message: event.target.value })
          }
          value={message.contact_message}
        />
        {errors.contact_message && (
          <div className="invalid-feedback">{errors.contact_message}</div>
        )}
      </div>
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
  );
};

export default FormContact;
