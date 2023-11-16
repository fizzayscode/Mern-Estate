import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  //   to allow certain exchanging of cookies acess cookies with the backend
  withCredentials: true,
});

export default api;
