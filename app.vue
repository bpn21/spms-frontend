<template>
  <div v-show="serverReady">
    <div v-if="authen.auth">
      <NuxtLayout name="default"></NuxtLayout>
    </div>
    <div v-else>
      <NuxtLayout name="custom"></NuxtLayout>
    </div>
  </div>
</template>

<script setup>
import { LocalStorage } from "quasar";
import { useAuthStore } from "@/stores/auth";
const serverReady = ref(false);

import { ref, onMounted, onBeforeMount } from "vue";
onMounted(() => {
  serverReady.value = true;
});

const authen = useAuthStore();
let token = ref(null);

watch(
  () => authen.auth,
  (newVal, oldVal) => {
    token.value = newVal;
  }
);
onBeforeMount(() => {
  token.value = LocalStorage.getItem("token");
});
onMounted(async () => {
  token.value = LocalStorage.getItem("token");

  if (token.value) {
    // haldle after tokem expiry in login page or in empty route
    authen.auth = true;
  }
});
</script>
