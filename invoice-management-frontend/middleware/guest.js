import { LocalStorage } from "quasar";
import { useAuthStore } from "@/stores/auth";

export default defineNuxtRouteMiddleware((from, to, router) => {
  const authen = useAuthStore();

  const token = LocalStorage.getItem("token");

  if (authen.auth) {
    return navigateTo("/dashboard");
  } else {
    // return abortNavigation();
  }
});
