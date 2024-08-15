<template>
  <div class="make-it-cente row justify-center">
    <div class="font-weight-bold">
      <div class="q-ma-md q-pa-md text-white text-bold">
        <q-form ref="loginForm" @submit="submitLoginForm()">
          <div class="q-pa-md shadow-9 text-black" style="border-radius: 6px">
            <div class="row" style="width: 42vw">
              <div class="col-6 col-sm-12 col-xs-12">
                <q-icon name="description" color="primary" size="150px" />
              </div>
              <div class="col-6 col-sm-12 col-xs-12">
                <div class="row q-pa-md">
                  <div class="col-12">
                    <q-input
                      v-model="profile.email"
                      dense
                      label="Email"
                    ></q-input>
                  </div>
                </div>
                <div class="row q-pa-md" v-if="loginOrRegister == 'register'">
                  <div class="col-12 col-sm-12 col-xs-12">
                    <q-input
                      v-model="profile.fullName"
                      dense
                      label="Full Name"
                    ></q-input>
                  </div>
                </div>

                <div class="row q-pa-md">
                  <div class="col-12">
                    <q-input
                      v-model="profile.password"
                      dense
                      label="Password"
                      type="password"
                    ></q-input>
                  </div>
                </div>
                <div class="row q-pa-md" v-if="loginOrRegister == 'register'">
                  <div class="col-12">
                    <q-input
                      v-model="profile.confirmPassword"
                      type="password"
                      dense
                      label="Confirm Password"
                    ></q-input>
                  </div>
                </div>
                <div class="row justify-center q-pa-xs">
                  <div>
                    <q-btn
                      style="width: 120px"
                      type="submit"
                      label="Submit"
                      dense
                      class="bg-primary text-white"
                    >
                    </q-btn>
                  </div>
                  <div class="text-caption q-ma-sm">
                    <div v-if="loginOrRegister == 'login'">
                      <span>Don't have an Account? Please</span>
                      <nuxt-link to="/register" class="cursor-pointer">
                        Register</nuxt-link
                      >
                    </div>
                    <div v-else>
                      <span>Alredy have an Account? </span>
                      <nuxt-link to="/login" class="cursor-pointer"
                        >Login</nuxt-link
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-form>
      </div>
    </div>
  </div>
</template>
<script>
definePageMeta({
  middleware: "guest",
});
import {
  postLogin,
  postRegister,
  sendOtp,
} from "./../data/accounts/authenticate";
import { useAuthStore } from "@/stores/auth";
import { useQuasar } from "quasar";
import { LocalStorage } from "quasar";

import { ref, reactive } from "vue";
export default {
  name: "LoginRegister",
  props: {
    loginOrRegister: {
      type: String,
    },
  },
  setup(props, context) {
    const profile = ref({
      email: "",
      password: "",
    });
    const $q = useQuasar();
    const loginForm = ref("");
    const authStore = useAuthStore();

    // console.log(useInvoice, "invoice is here");
    // const { postLogin } = useInvoice();
    function submitLoginForm() {
      if (props.loginOrRegister == "login") {
        postLogin(profile.value.email, profile.value.password)
          .then((response) => {
            const token = response.data.token;
            LocalStorage.set("token", token);
            authStore.auth = true;
            // const { message } = response;
            navigateTo({ name: "dashboard" });
          })
          .catch((e) => {
            const { response } = e;
          });
      } else {
        postRegister(
          profile.value.email,
          profile.value.fullName,
          profile.value.password,
          profile.value.confirmPassword
        )
          .then((res) => {
            $q.notify({
              color: "secondary",
              message: res.data.msg,
            });
          })
          .catch((e) => {
            const { response } = e;
            const { status, data } = response;
            const errorMessages = [];
            if (data && data.errors) {
              for (const field in data.errors) {
                const messages = data.errors[field];
                if (field == "non_field_errors") {
                  messages.forEach((message) => {
                    $q.notify({
                      color: "negative",
                      message: `${message}`,
                    });
                  });
                } else {
                  messages.forEach((message) => {
                    $q.notify({
                      color: "negative",
                      message: `${field}: ${message}`,
                    });
                  });
                }
              }
            }
            for (let errorMessage in errorMessages) {
              $q.notify({
                color: "negative",
                message:
                  errorMessages[errorMessage] || "An unknown error occurred", // Fallback message if no errors
              });
            }
          });
      }
    }
    return { profile, loginForm, submitLoginForm };
  },
};
</script>
<style>
.container {
  position: relative;
  height: 90vh; /* Use 100vh to make the container full height of the viewport */
}

.make-it-center {
  position: absolute;
  top: 45%;
  left: 50%;
}
</style>
