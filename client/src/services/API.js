import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_BASEURL });

API.interceptors.request.use((req) => {
    //if user is login->generate token->add in localStorage
  if (localStorage.getItem("token")) {
    //if we get use basic request call
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")} `;
  }
  return req;
});

//now using API we can perform CRUD operations
export default API;