// stores/counter.js
import { api } from "./../boot/axios";
import { defineStore } from "pinia";
import { LocalStorage } from "quasar";
export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      auth: LocalStorage.getItem("token") ? true : false,
      isRefreshing: false,
    };
  },

  actions: {
    login() {
      this.$patch({ auth: true }); // Use this.$patch instead of this.setAuth
    },
    logout() {
      this.auth = false;
      LocalStorage.clear();
    },
    setAuth(value) {
      this.auth = value;
    },
    setIsRefreshing(value) {
      this.isRefreshing = value;
    },
    async refresh(payload) {
      this.setIsRefreshing(true);
      try {
        // this.$patch({ isRefreshing: true });
        const response = await api.post("api/user/refresh/", payload);
        debugger;
        debugger;
        LocalStorage.set("token", response.data);
        this.setIsRefreshing(false);
      } catch (error) {
        reject(error);
      }
    },
  },
});
