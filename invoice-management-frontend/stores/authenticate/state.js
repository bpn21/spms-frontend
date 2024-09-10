import { LocalStorage } from "quasar";

let token = LocalStorage.getItem("token");

let initialState = token
  ? { token: token, isLoggedIn: "true" }
  : { token: {}, isLoggedIn: "false" };

return {
  ...initialState,
};
