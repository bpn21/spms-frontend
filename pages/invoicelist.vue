<template>
  <div v-if="authen?.auth">
    <InvoiceTable />
  </div>
</template>

<script setup>
import InvoiceTable from "~/components/invoice/invoiceTable.vue";
import { useAuthStore } from "@/stores/auth";
const authen = useAuthStore();
</script>
