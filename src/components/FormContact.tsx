import "bootstrap/dist/css/bootstrap.css";
import { FormEvent, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Box, Button } from "@chakra-ui/react";

const FormContact = () => {
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
      emailjs
        .sendForm(
          import.meta.env.VITE_REACT_APP_EMAIL_SERVICE_ID,
          import.meta.env.VITE_REACT_APP_EMAIL_TEMPLATE_ID,
          form.current,
          import.meta.env.VITE_REACT_APP_EMAIL_PUBLIC_KEY
        )
        .then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );
    }
  };
  return (
    <form ref={form} onSubmit={sendEmail}>
      <div className="mb-3">
        <label htmlFor="contact_name" className="form-label">
          Name:
        </label>
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
        <label htmlFor="contact_email" className="form-label">
          Email:
        </label>
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
        <label htmlFor="contact_message" className="form-label">
          Message:
        </label>
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
        <Button colorScheme="base" variant="outline" type="submit">
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default FormContact;
