<template>
  <div class="row justify-center">
    <dynamicForm
      v-if="authen.auth"
      @formDetails="submitFormData($event)"
      :formType="'salesInvoice'"
      :submitName="'Submit Invoice'"
      :addMoreLabel="'Add More Products'"
      :products="allProducts"
      :clients="allClients"
      :employees="allEmployees"
      :searchLabel="'Search Product'"
      :userProfile="userProfile"
    />
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { getProducts } from "~/data/products/products";
import { getUserProfile } from "~/data/accounts/authenticate";
import { postInvoiceDetails } from "~/data/inovice/invoice";
import { getEmployees } from "~/data/employees/employees";

const authen = useAuthStore();
const allProducts = ref([]);
const allClients = ref([]);
const allEmployees = ref([]);
const userProfile = ref([]);

onMounted(() => {
  if (!authen.auth) {
    navigateTo("/login");
  }
});
definePageMeta({
  middleware: "admin",
});
import dynamicForm from "~/components/dynamicForm.vue";
import { getClients } from "~/data/clients/clients";
const submitFormData = (event) => {
  postInvoiceDetails(event).then(() => {});
};
const fetchProducts = () => {
  getProducts().then((res) => {
    allProducts.value = res.data.data;
  });
};
const fetchUserProfile = () => {
  getUserProfile().then((res) => {
    userProfile.value = res.data;
  });
};
const fetchClients = () => {
  getClients().then((res) => {
    allClients.value = res.data.data;
  });
};
const fetchEmployees = () => {
  getEmployees().then((res) => {
    allEmployees.value = res.data.data;
  });
};
fetchProducts();
fetchUserProfile();
fetchClients();
fetchEmployees();
</script>
