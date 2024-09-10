import { LocalStorage } from "quasar";
import { useAuthStore } from "@/stores/auth";
import { notEqual } from "assert";
export default defineNuxtRouteMiddleware((from, to, router) => {
  const authen = useAuthStore();

  const token = LocalStorage.getItem("token");
  let route = to.path;

  if (!token || !authen.auth) {
    // return navigateTo("/login");
    abortNavigation();
  } else {
    // navigateTo("/login");
  }
});
