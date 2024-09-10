import axios from "axios";
import { LocalStorage } from "quasar";
import { useAuthStore } from "@/stores/auth";

const api = axios.create({ baseURL: "http://localhost:8000/" });

api.interceptors.request.use(
  (config) => {
    const token = LocalStorage.getItem("token")?.access;
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const screenSize = `${screenWidth}x${screenHeight}`;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.url == "api/users/login/")
      config.data = {
        ...config.data,
        screen_size: screenSize,
      };

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { status } = error.response;
    const orginalRequest = error.config;
    const authen = useAuthStore();

    if (orginalRequest.url == "api/user/refresh/") {
      authen.logout();
      navigateTo("/login");
    }

    if (status != 401) return Promise.reject(error);

    if (!authen.isRefreshing) {
      authen
        .refresh({ refresh: LocalStorage.getItem("token")?.refresh })
        .then(() => {
          return Promise.resolve(api.request(orginalRequest.url));
        });
    }

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
