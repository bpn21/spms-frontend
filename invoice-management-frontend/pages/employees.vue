<template>
  <div>
    <dynamicForm
      :formType="'employees'"
      :submitName="'Sumbit Employee'"
      @formDetails="submitForm($event)"
      :employees="rows"
      :products="rows"
      :addMoreLabel="'Add More Employees'"
      :searchLabel="'Search Employee'"
    />
  </div>

  <div class="row justify-center">
    <q-bar class="bg-grey-3 col-md-11 q-ma-md">
      <q-input
        rounded
        outlined
        dense
        :label="formType == 'salesInvoice' ? ' Search Items' : 'Search Product'"
        v-model="searchProduct"
      >
        <template v-slot:append>
          <q-avatar>
            <q-icon size="md" name="search" />
          </q-avatar>
        </template>
      </q-input>
      <q-space></q-space>
    </q-bar>
  </div>
  <div class="row justify-center">
    <q-table
      flat
      class="bg-grey-3 col-md-11"
      bordered
      :rows="filteredProducts"
      :columns="columns"
      row-key="name"
      :pagination="initialPagination"
    />
  </div>
</template>

<script setup>
// import { env } from "process";
import dynamicForm from "~/components/dynamicForm.vue";
import { postEmployees, getEmployees } from "~/data/employees/employees";
let searchProduct = ref("");
const columns = ref([
  {
    name: "full_name",
    align: "center",
    label: "Products",
    field: "full_name",
    sortable: true,
  },
  {
    name: "name",
    align: "center",
    label: "Products",
    field: "name",
    sortable: true,
  },
  {
    name: "brand",
    align: "center",
    label: "Brand",
    field: "brand",
    sortable: true,
  },
  {
    name: "size",
    align: "center",
    label: "Size",
    field: "size",
    sortable: true,
  },
]);
const rows = ref([]);

const submitForm = (event) => {
  // const formData = new FormData();
  // const postData = [];
  // event.products.forEach((i) => {
  //   formData.append("full_name", i.employee);
  //   formData.append("address", i.employee_dp);
  //   formData.append("contact_number", i.contact_no);
  //   formData.append("emergency_contact_number", i.emergency_contact_no);
  //   formData.append("degination", i.degination);
  // });
  event.products.forEach((i) => {
    let obj = {
      full_name: i.employee,
      address: i.address,
      contact_number: i.contact_no,
      emergency_contact_number: i.emergency_contact_no,
      degination: i.degination,
      image: i.employee_dp, // Assuming i.employee_dp is a File object
    };
    postData.push(obj);
  });
  // for (let pair of formData.entries()) {
  //   console.log(pair[0], pair[1], "post form");
  // }
  postEmployees(postData);
  // postEmployees([formData]);
};
const fetchEmployees = () => {
  getEmployees().then((res) => {
    rows.value = res.data.data;
  });
};
const filteredProducts = computed(() => {
  return rows.value.filter((i) => i.full_name.includes(searchProduct.value));
});
fetchEmployees();
</script>
