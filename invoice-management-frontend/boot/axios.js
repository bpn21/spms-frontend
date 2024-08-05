import { boot } from "quasar/wrappers";
import axios from "axios";
import { LocalStorage } from "quasar";
const api = axios.create({ baseURL: "http://localhost:8000/" });

import { useAuthStore } from "~/stores/auth";
api.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    const token = LocalStorage.getItem("token")?.access;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
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
    if (error?.response?.status === 401) {
      const authen = useAuthStore();
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
