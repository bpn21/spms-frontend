<template>
  <!-- <NuxtLayout name="custom"> -->
  <div v-if="authen.auth">Dashboard Page</div>
  <!-- </NuxtLayout> -->
  <slot />
</template>
<script setup>
import { LocalStorage } from "quasar";
import { useAuthStore } from "@/stores/auth";
import { computed, onMounted } from "vue";
definePageMeta({
  middleware: "admin",
  layout: "default",
});

const authen = useAuthStore();
onMounted(() => {
  if (!authen.auth) {
    navigateTo("/login");
  }
});
let isLoggedIn = ref("");
isLoggedIn.value = LocalStorage.getItem("token") ? true : false;
</script>
