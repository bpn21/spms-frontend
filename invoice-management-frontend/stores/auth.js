// stores/counter.js
import { api } from "./../boot/axios";
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
      this.$patch({ auth: true }); // Use this.$patch instead of this.setAuth
    },
    logout() {
      this.$patch({ auth: false }); // Use this.$patch instead of this.setAuth
    },

    refresh(payload) {
      return new Promise((resolve, reject) => {
        try {
          const data = api.post("api/user/refresh/", payload);
          resolve(data);
        } catch (error) {
          reject(error);
        }
      });
    },
  },
});
