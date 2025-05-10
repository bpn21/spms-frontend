<template>
  <div class="row">
    <div class="col-12">
      <CountCards />
    </div>
  </div>
  <div class="q-py-sm">
    <InvoiceTable />
  </div>
  <div v-if="authen.auth">Dashboard Page</div>
</template>
<script setup>
import { LocalStorage } from "quasar";
import { useAuthStore } from "@/stores/auth";
import { computed, onMounted } from "vue";
import CountCards from "~/components/dashboard/countCards.vue";
import InvoiceTable from "@/components/invoice/invoiceTable.vue";

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
