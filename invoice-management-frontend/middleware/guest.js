import { LocalStorage } from "quasar";

export default defineNuxtRouteMiddleware((from, to, router) => {
  const token = LocalStorage.getItem("token");

  if (token) {
    return navigateTo("/dashboard");
  } else {
    // return abortNavigation();
  }
});
