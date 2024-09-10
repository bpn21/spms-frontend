<template>
  <div>
    <dynamicForm
      :formType="'clients'"
      :submitName="'Sumbit Clients'"
      :addMoreLabel="'Add More Clients'"
      @formDetails="submitForm($event)"
      :products="rows"
      :searchLabel="'Search Client'"
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
import { postClients, getClients } from "~/data/clients/clients";
let searchProduct = ref("");
const columns = ref([
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
  console.log(event, "event is here");
  let products = event.products.map((i) => {
    return {
      client_name: i.client,
      vat_number: i.vat_number,
      pan_number: i.pan_number,
      address_line_1: i.address_line_1,
      address_line_2: i.address_line_2,
      contact_number: "9869177567",
      remarks: "remarks",
      status: "Active",
    };
  });
  console.log(products, "products is here");
  postClients(products);
};
const fetchClients = () => {
  getClients().then((res) => {
    rows.value = res.data.data;
  });
};
const filteredProducts = computed(() => {
  return rows.value.filter((i) => i.name?.includes(searchProduct.value));
});
fetchClients();
</script>
