import { boot } from "quasar/wrappers";
import axios from "axios";
import { LocalStorage } from "quasar";
const api = axios.create({ baseURL: "http://localhost:8000/" });
import { useAuthStore } from "@/stores/auth";

api.interceptors.request.use(
  (config) => {
    const token = LocalStorage.getItem("token")?.access;
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // config.headers["User-Agent"] = modifiedUserAgent;
    config.data = {
      ...config.data,
      screen_size: `${screenWidth}x${screenHeight}`,
    };
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
    const { status } = error.response;
    const orginalRequest = error.config;
    if (orginalRequest.url == "api/token/refresh/") {
      const authen = useAuthStore();
      authen.auth = false;
      authen.logout();
      LocalStorage.clear();
      navigateTo("/login");
    }
    if (status != 401) return Promise.reject(error);

    // Do something with request error
  }
);

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
export { api };
