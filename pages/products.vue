<template>
  <div>
    <dynamicForm
      :formType="'products'"
      :submitName="'Sumbit Products'"
      :addMoreLabel="'Add More Products'"
      @formDetails="submitForm($event)"
      :products="rows"
      :searchLabel="'Search Product'"
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
import { postProducts, getProducts } from "~/data/products/products";
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
  let products = event.products.map((i) => {
    return { name: i.product, brand: i.brand, size: i.size };
  });
  postProducts(products).then(() => {
    fetchProducts();
  });
};
const fetchProducts = () => {
  getProducts().then((res) => {
    rows.value = res.data.data;
  });
};
const filteredProducts = computed(() => {
  return rows.value.filter((i) => i.name.includes(searchProduct.value));
});
fetchProducts();
</script>
