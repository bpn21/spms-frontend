import { LocalStorage } from "quasar";
import { useAuthStore } from "@/stores/auth";

export default defineNuxtRouteMiddleware((from, to, router) => {
  const token = LocalStorage.getItem("token");
  if (token) {
    return navigateTo("/dashboard");
  }
});
