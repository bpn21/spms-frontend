// stores/counter.js
import { defineStore } from "pinia";
import { LocalStorage } from "quasar";
const token = LocalStorage.getItem("token");
export const useAuthStore = defineStore("auth", {
  state: () => {
    return { auth: LocalStorage.getItem("token") ? true : false };
  },

  // could also be defined as
  // state: () => ({ auth: 0 })
  // Mutations
  mutations: {
    setAuth(value) {
      this.auth = value;
    },
  },
  actions: {
    login() {
      // this.auth++;
      this.$patch({ auth: true }); // Use this.$patch instead of this.setAuth
      // console.log("localstorage", LocalStorage.getItem("token"));
    },
    logout() {
      this.$patch({ auth: false }); // Use this.$patch instead of this.setAuth
    },
  },
});
