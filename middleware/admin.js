import { useAuthStore } from "@/stores/auth";
export default defineNuxtRouteMiddleware((from, to, router) => {
  const authen = useAuthStore();
  if (!authen.auth) {
    navigateTo("/login");
  }
});
