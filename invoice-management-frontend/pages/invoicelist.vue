<template>
  <div class="q-pa-md">
    <q-table
      color="primary"
      card-class="bg-amber-5 text-brown"
      table-class="text-grey-8"
      table-header-class="text-brown"
      flat
      bordered
      title="Invoices"
      :rows="rows"
      :columns="columns"
      row-key="id"
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
            <q-btn
              size="sm"
              color="accent"
              round
              dense
              @click="props.expand = !props.expand"
              :icon="props.expand ? 'remove' : 'add'"
            />
          </q-td>
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <div class="text-left">
              <q-table
                color="primary"
                card-class="bg-amber-5 text-brown"
                table-class="text-grey-8"
                table-header-class="text-brown"
                flat
                bordered
                :title="props.row.client"
                :rows="props.row.products"
                :columns="productColumns"
                row-key="id"
              />
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { getInvoiceDetails } from "./../data/inovice/invoice";
import { getProducts } from "./../data/products/products";
import { ref, onMounted } from "vue";

export default {
  setup() {
    const columns = [
      {
        name: "date",
        required: true,
        label: "Date",
        align: "left",
        field: (row) => row.date,
        // format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "bill_number",
        required: true,
        label: "Bill No",
        align: "left",
        field: "bill_number",
        // format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "client",
        align: "center",
        label: "Client",
        field: "client",
        sortable: true,
      },
      {
        name: "employee",
        label: "Employee (g)",
        field: "employee",
        sortable: true,
      },
      {
        name: "payment-status",
        label: "Payment Status",
        field: "payment_status",
      },

      // {
      //   name: "quantity",
      //   label: "Quantity",
      //   field: "quantity",
      //   sortable: true,
      //   sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
      //   format: (val) => val,
      // },
      {
        name: "Total",
        label: "Total",

        sortable: true,
        field: (row) => {
          console.log("bipin is here", row);
          return row.products.reduce(
            (sum, item) => item.price * item.quantity + sum,
            0
          );
        },
      },
    ];
    const rows = ref([]);

    const productRows = ref([]);
    const productColumns = ref([
      {
        name: "product",
        required: true,
        label: "Product",
        align: "left",
        field: (row) => row.product,
        // format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "quantity",
        required: true,
        label: "Quantity",
        align: "left",
        field: (row) => row.quantity,
        // format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "price",
        required: true,
        label: "Price",
        align: "left",
        field: (row) => row.price,
        sortable: true,
      },
      {
        name: "totak",
        required: true,
        label: "Total",
        align: "left",
        field: (row) => row?.price * row?.quantity,
        sortable: true,
      },
    ]);

    getInvoiceDetails().then((res) => {
      rows.value = res.data;
      debugger;
      rows.value.forEach((i) => {
        let quantity = 0;

        i.quantity = i.products.reduce((sum, item) => item.quantity + sum, 0);
      });
    });

    getProducts().then((product) => {
      let products = product.data.data;
      getInvoiceDetails().then((res) => {
        rows.value = res.data;
        debugger;
        rows.value.forEach((i) => {
          let quantity = 0;
          i.products.forEach((m) => {
            console.log(m, "products ko id");
            // m.product = "abc";
            m.product = products.find((f) => {
              console.log(f, "details ko id");

              return f.id == m.product;
            }).name;
          });
          return (i.quantity = i.products.reduce(
            (sum, item) => item.quantity + sum,
            0
          ));
        });
      });
    });

    console.log(rows.value, "bipin ");
    return {
      columns,
      rows,
      productColumns,
      productRows,
    };
  },
};
</script>
