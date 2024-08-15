import { boot } from "quasar/wrappers";
import axios from "axios";
import { LocalStorage } from "quasar";
const api = axios.create({ baseURL: "http://localhost:8000/" });
import { useAuthStore } from "@/stores/auth";

api.interceptors.request.use(
  (config) => {
    const token = LocalStorage.getItem("token")?.access;
    const userAgent = navigator.userAgent;
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const modifiedUserAgent = `${userAgent} (Screen: ${screenWidth}x${screenHeight})`;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers["User-Agent"] = modifiedUserAgent;

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    // Do something before request is sent
    return response;
  },
  (error) => {
    // alert(error?.response.status);
    if (error?.response?.status === 401) {
      const authen = useAuthStore();
      authen.auth = false;
      authen.logout();
      LocalStorage.clear();
      navigateTo("/login");
    }
    // Do something with request error
    return Promise.reject(error);
  }
);

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
export { api };
