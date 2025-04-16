import axios from "axios";
import useUserStore from "../store/userStore";
import { toast } from "react-toastify";
const apiURL = import.meta.env.VITE_APP_API_URL;

const axiosClient = axios.create({
  baseURL: new URL(apiURL).toString(),
  withCredentials: false,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

axiosClient.interceptors.response.use(
  (val) => val,
  (err) => {
    if (err.response.status === 401) {
      toast.error("Session expired, please login again");
      localStorage.removeItem("token");
      useUserStore.setState({ data: null });
    }
    return Promise.reject(err);
  },
);

export default axiosClient;
