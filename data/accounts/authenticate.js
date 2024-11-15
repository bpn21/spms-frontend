import { LocalStorage } from "quasar";
import { api } from "../../boot/axios";
import { Notify } from "quasar";
const $q = useQuasar();

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
      message: response.data.msg,
    });

    return response;
  } catch (error) {
    const { response } = error;
    let { status, data } = response;
    let { errors } = data;
    if (status == 404) {
      Notify.create({
        type: "negative",
        message: data.error.non_field_errors[0],
      });
    } else if (status === 412) {
      LocalStorage.set("user_id", response.data.user_id);
      navigateTo({ name: "verifyOtp" });
    }
    throw error;
  }
}
export async function sendOtp() {
  try {
    const response = await api.post("api/user/send-otp/");
    return response;
  } catch (e) {
    throw e;
  }
}
export async function verifyOtp(payload) {
  try {
    const response = await api.post("api/user/verify-otp/", payload);
    return response;
  } catch (e) {
    throw e;
  }
}
export async function logMeOutApi() {
  try {
    const response = await api.post("api/user/logout/", {
      token: LocalStorage.getItem("token")?.refresh,
    });
    const { data } = response;
    LocalStorage.set("token", response.data.token);
    Notify.create({
      color: "secondary",
      message: data.msg,
    });

    return response;
  } catch (error) {
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
    Notify.create({
      color: "secondary",
      message: "Successfully Registered",
    });

    return response;
  } catch (error) {
    throw error;
  }
}
