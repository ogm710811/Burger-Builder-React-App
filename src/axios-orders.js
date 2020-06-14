import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://react-burger-builder-4cbc2.firebaseio.com/",
});

export default axiosInstance;
