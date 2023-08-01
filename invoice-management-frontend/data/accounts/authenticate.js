import { LocalStorage } from "quasar";
import { api } from "../../boot/axios";
import { Notify } from "quasar";
// const $q = useQuasar();

export async function getUserProfile(email, password) {
  try {
    const response = await api.get("api/user/userprofile/", {
      email,
      password,
    });

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function postLogin(email, password) {
  try {
    const response = await api.post("api/user/login/", { email, password });

    LocalStorage.set("token", response.data.token);
    Notify.create({
      color: "secondary",
      message: "Successfully Logged In",
    });

    return response;
  } catch (error) {
    Notify.create({
      color: "negative",
      message: "Incorrect email or password",
    });
    console.error(error);
    throw error;
  }
}
export async function postRegister(email, fullName, password, confirmPassword) {
  let password2 = confirmPassword;
  let name = fullName;
  try {
    const response = await api.post("api/user/register/", {
      email,
      name,
      password,
      password2,
    });
    return response;
  } catch (error) {
    throw error;
  }
}
