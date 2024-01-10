import axios, { CanceledError } from "axios";

export default axios.create({
  baseURL: "https://",
  headers: {
    "api-key": "XXDSCFR",
  },
});

export { CanceledError };
