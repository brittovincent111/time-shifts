import axios from "axios";
const baseURL = "http://localhost:4000/admin/";

const defaultOptions = {
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
};

// Create  user instance
let admininstance = axios.create(defaultOptions);

// Set the AUTH token for any request
admininstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("Admintoken");
  console.log(token , "token")
  config.headers.accesstoken = token;
  return config;
});

export default admininstance;