import axios from "axios";

const instance = axios.create({
  baseURL: "https://llmeta-be.llmeta.o-r.kr/",
});

export default instance;
