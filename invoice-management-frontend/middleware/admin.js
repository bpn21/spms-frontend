import { LocalStorage } from "quasar";
import { useAuthStore } from "@/stores/auth";
import { notEqual } from "assert";

export default defineNuxtRouteMiddleware((from, to, router) => {
  const token = LocalStorage.getItem("token");
  let route = to.path;

  if (!token) {
    // return navigateTo("/login");
    abortNavigation();
  } else {
  }
});
