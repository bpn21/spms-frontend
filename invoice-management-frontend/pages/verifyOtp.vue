<template>
  <div class="row q-gutter-sm">
    <q-input v-model="loginOtp"> </q-input>
    <q-btn @click="submit">Submit</q-btn>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { verifyOtp } from "./../data/accounts/authenticate";
import { useAuthStore } from "@/stores/auth";
import { LocalStorage } from "quasar";

const authen = useAuthStore();

let loginOtp = ref("");
const submit = () => {
  verifyOtp({ otp: loginOtp.value, id: LocalStorage.getItem("user_id") })
    .then((response) => {
      authen.auth = true;
      const token = response.data.token;
      console.log(token, "token");
      LocalStorage.set("token", token);

      Notify.create({
        color: "secondary",
        message: "Otp has been successfully sent to your email",
      });
      navigateTo({ name: "dashboard" });
    })
    .catch((e) => {
      // LocalStorage.clear();
    });
};
</script>
