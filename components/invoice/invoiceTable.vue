<template>
  <div class="q-pa-x">
    <q-table
      dense
      flat
      bordered
      :rows="invoiceStore.invoices || []"
      :columns="columns"
      row-key="name"
      hide-bottom
      v-model:expanded="expanded"
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width />

          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-toggle
              v-model="props.row.expand"
              checked-icon="add"
              unchecked-icon="remove"
            />
          </q-td>

          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            :class="statusColor(props.row.payment_status)"
          >
            {{ col.value }}
          </q-td>
        </q-tr>
        <q-tr v-show="props.row.expand" :props="props">
          <q-td colspan="100%">
            <div class="text-left">
              <q-table
                dense
                hide-bottom
                :rows="props.row.products"
                :columns="invoiceProductCol"
              />
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useInvoiceStore } from "@/stores/invoice";

const statusColor = (paymentStatus) => {
  switch (paymentStatus) {
    case "OVERDUE":
      return "bg-red-1";
    case "DUE":
      return "bg-yellow-1";
    case "PAID":
      return "bg-green-1 ";
  }
};
const invoiceProductCol = [
  {
    name: "product",
    field: "product",
    label: "Product",
    format: (val) => val.name,
    align: "left",
  },
  {
    name: "quantity",
    field: "quantity",
    label: "Quantity",
    format: (val) => val,
    align: "left",
  },
  {
    name: "price",
    label: "Price",
    field: "price",
    align: "left",
    format: (val) => "Rs " + val || "",
  },
  //   {
  //     name: "brand",
  //     field: "product",
  //     label: "Brand",
  //     format: (val) => val.brand,
  //     align: "left",
  //   },
  {
    name: "total_cost",
    field: "total_cost",
    label: "Total",
    format: (val) => val,
    align: "left",
  },
];
const columns = [
  { name: "date", label: "Date", field: "date", align: "left" },
  { name: "client", label: "Client", field: "client", align: "left" },
  {
    name: "total_quantity",
    label: "Cumulative Quantity",
    field: "total_quantity",
    align: "left",
  },
  {
    name: "payment_status",
    label: "Status",
    field: "payment_status",
    align: "left",
  },
  {
    name: "total_cost",
    label: "Total",
    field: "total_cost",
    align: "left",
    format: (val) => "Rs " + val || "",
  },

  {
    name: "total_cost",
    label: "Contact Number",
    field: "contact_number",
    align: "center",
    format: (val) => val || "-",
  },
];
const invoiceStore = useInvoiceStore();
const invoice = ref(null);

onMounted(async () => {
  if (invoiceStore.invoices) return;
  invoice.value = await invoiceStore.invoiceDetails();
});
</script>
