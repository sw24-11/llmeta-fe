import axios from "axios";

const instance = axios.create({
  baseURL: "http://52.79.78.129:8080/api",
});

export default instance;
