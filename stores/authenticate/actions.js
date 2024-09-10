import { api } from "boot/axios";
import { LocalStorage } from "quasar";

export async function postLogin(email, password) {
  try {
    const response = await api.post("/api/user/login/", { email, password });

    LocalStorage.set("token", response.data.token);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function postRegister(email, password) {
  try {
    const response = await api.post("/api/user/register/", {
      email,
      fullName,
      password,
      confirmPassword,
    });

    LocalStorage.set("token", response.data.token);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
