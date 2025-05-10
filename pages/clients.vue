<template>
  <div class="zoom-out">
    <div class="">
      <dynamicForm
        :formType="'clients'"
        :submitName="'Sumbit Clients'"
        :addMoreLabel="'Add More Clients'"
        @formDetails="submitForm($event)"
        :products="rows"
        :searchLabel="'Search Client'"
      />
    </div>

    <div class="row q-py-sm">
      <q-input
        outlined
        dense
        :label="formType == 'salesInvoice' ? ' Search Items' : 'Search Product'"
        v-model="searchClient"
      >
        <template v-slot:append>
          <q-avatar>
            <q-icon size="md" name="search" />
          </q-avatar>
        </template>
      </q-input>
      <q-space></q-space>
    </div>

    <div class="">
      <q-table
        flat
        class="bg-grey-3"
        bordered
        :rows="filteredClients"
        :columns="columns"
        row-key="name"
        :pagination="initialPagination"
      />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "admin",
  layout: "default",
});

// import { env } from "process";
import dynamicForm from "~/components/dynamicForm.vue";
import { useQuasar } from "quasar";
import { postClients, getClients } from "~/data/clients/clients";
const searchClient = ref("");
const $q = useQuasar();
const columns = ref([
  {
    name: "client_name",
    align: "center",
    label: "Client",
    field: "client_name",
    sortable: true,
  },
  {
    name: "address_line_1",
    align: "center",
    label: "Address Line 1",
    field: "address_line_1",
    sortable: true,
  },
  {
    name: "address_line_2",
    align: "center",
    label: "Address Line 2",
    field: "address_line_2",
    sortable: true,
  },
]);
const rows = ref([]);

const submitForm = (event) => {
  let products = event.products.map((i) => {
    return {
      client_name: i.client,
      vat_number: i.vat_number,
      pan_number: i.pan_number,
      address_line_1: i.address_line_1,
      address_line_2: i.address_line_2,
      contact_number: i.phone_number,
      remarks: i.remarks || "Remarks",
      status: i.status || "Active",
    };
  });
  postClients(products).then((res) => {
    rows.value.unshift(...res.data);
    $q.notify({
      type: "positive",
      message: `New Client Added`,
    });
  });
};
const fetchClients = () => {
  getClients().then((res) => {
    rows.value = res.data;
  });
};
const filteredClients = computed(() => {
  return rows.value.filter((i) => i.client_name.includes(searchClient.value));
});
fetchClients();
</script>
<style>
.zoom-out {
  transform: scale(0.9);
  transform-origin: top left;
  width: calc(100% / 0.9);
}
</style>
