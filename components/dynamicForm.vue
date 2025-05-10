<template>
  <div class="row justify-center col-12">
    <q-form
      ref="newInvoice"
      @submit="submitForm"
      class="col-md-9 q-pa-xs-xs shadow-9 q-pa-xs col-xs-12"
    >
      <div
        v-if="formType == 'salesInvoice'"
        class="q-pa-xs row justify-center hidden"
      >
        <div class="col-3 q-pa-sm">
          <q-input
            v-if="formType == 'salesInvoice'"
            outlined
            dense
            v-model="invoice.employee"
            label="User"
          ></q-input>
        </div>
      </div>
      <!-- HEADER -->

      <div class="text-center text-h2 bg-grey-3">{{ title }}</div>
      <q-separator inset class="q-mb-md q-mx-xs"></q-separator>

      <div class="row q-pa-xs">
        <div class="col-12 row justify-between q-gutter-xs">
          <div
            class="col-md-2 col-sm-2 col-sm-grow text-left"
            v-if="formType == 'salesInvoice'"
          >
            <q-input
              v-if="formType == 'salesInvoice'"
              :rules="[(val) => !!val || 'Field is required']"
              outlined
              dense
              v-model="invoice.bill_number"
              type="number"
              label="Bill No"
            ></q-input>
          </div>

          <div class="col-md-2 col-sm-2 col-sm-grow text-left">
            <q-input filled dense v-model="invoice.date" mask="date">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date clickable v-close-popup v-model="invoice.date">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <!-- <q-input
                v-if="formType == 'salesInvoice'"
                dense
                v-model="invoice.date"
                marks="####-##-##"
                label="Due Date"
              ></q-input> -->
          </div>
        </div>

        <div class="row col-12 justify-between q-gutter-xs">
          <div
            v-if="formType == 'salesInvoice'"
            class="col-md-5 col-sm-5 col-sm-grow col-xs-12"
          >
            <q-select
              class="full-width"
              :rules="[(val) => !!val || 'Field is required']"
              outlined
              dense
              :options="clients"
              :option-value="'id'"
              :option-label="'client_name'"
              v-model="invoice.client"
              label="Choose Client"
            ></q-select>
          </div>

          <div
            v-if="formType == 'salesInvoice'"
            class="col-md-5 col-sm-5 col-sm-grow col-xs-12"
          >
            <q-input dense v-model="invoice.title" label="Title"></q-input>
          </div>
        </div>
      </div>
      <!-- EOF HEADER -->

      <div v-if="formType == 'salesInvoice'" class="row q-px-sm">
        <div
          v-if="formType == 'salesInvoice'"
          class="col-md-3 col-xs-grow q-pa-xs q-pa-xs-xs"
        >
          <q-input dense v-model="invoice.pan_number" label="Pan No"></q-input>
        </div>
        <div
          v-if="formType == 'salesInvoice'"
          class="col-md-3 col-xs-grow q-pa-xs q-pa-xs-xs"
        >
          <q-input dense v-model="invoice.vat_number" label="Vat No"></q-input>
        </div>

        <div class="col-md-3 q-pa-xs q-pa-xs-xs col-xs-grow">
          <q-input
            dense
            v-model="invoice.contact_no"
            label="Contact No"
          ></q-input>
        </div>

        <div
          class="col-md-3 q-pa-xs q-pa-xs-xs col-xs-grow"
          v-if="formType == 'salesInvoice'"
        >
          <q-select
            dense
            style="min-width: 220px; max-width: 220px"
            use-input
            :options="['PAID', 'DUE']"
            v-model="invoice.payment_status"
            label="Payment Status"
          ></q-select>
        </div>
      </div>

      <!-- STICKY BAR -->
      <div class="sticky-bar">
        <q-bar class="bg-grey-2 q-pa-lg row justify-between">
          <q-input
            rounded
            outlined
            dense
            :label="searchLabel"
            v-model="searchProduct"
          >
            <template v-slot:append>
              <q-avatar>
                <q-icon size="md" name="search" />
              </q-avatar>
            </template>
          </q-input>
          <div>
            <q-btn
              rounded
              style="padding-top: 0px; padding-bottom: 0px"
              class="bg-secondary text-white"
              @click="addMoreProduct()"
            >
              {{ addMoreLabel }}
            </q-btn>
            {{ multipleFields.length }}
            {{ multipleFields.length > 1 ? "Items" : "Item" }}
          </div>
        </q-bar>
      </div>

      <q-card class="q-my-md" flat>
        <div
          class="row justify-center q-px-sm"
          v-for="(item, index) in searchableMultipleFields"
          :key="index"
        >
          <div
            class="col-9 col-grow"
            v-if="
              formType == 'clients' ||
              formType == 'products' ||
              formType == 'salesInvoice' ||
              formType == 'employees'
            "
          >
            <div v-if="formType == 'products'" class="row">
              <q-input
                outlined
                dense
                class="col-md-3 col-sm-3 col-xs-3 q-pa-xs q-xs-pa-xs"
                v-model="item.product"
                label="Product"
              ></q-input>
              <q-input
                outlined
                dense
                class="col-md-3 col-sm-3 col-xs-3 q-pa-xs q-xs-pa-xs"
                v-model="item.brand"
                label="Brand"
              ></q-input>
              <q-input
                outlined
                dense
                class="col-md-3 col-sm-3 col-xs-3 q-pa-xs q-xs-pa-xs"
                v-model="item.size"
                label="Size"
              ></q-input>
            </div>

            <div class="col-9">
              <q-table
                :rows="[item]"
                :columns="columns"
                hide-bottom
                hide-header
                flat
                :separator="$q.screen.gt.xs ? 'cell' : ''"
                pagination="{ rowsPerPage: 0 }"
              >
                <!-- Custom Header -->
                <!-- <template v-slot:header="props">
                  <q-tr :props="props">
                    <div class="row">
                      <q-th class="col-sm-3 col-xs-12">Item Details</q-th>
                      <q-th class="col-sm-3 col-xs-12">Quantity</q-th>
                      <q-th class="col-sm-3 col-xs-12">Rate</q-th>
                      <q-th class="col-1">Amount</q-th>
                    </div>
                  </q-tr>
                </template> -->
                <template v-slot:body="props">
                  <q-tr :props="props">
                    <div class="row justify-center">
                      <q-td class="col-sm-3 col-sm-grow col-xs-12">
                        <q-select
                          v-if="formType == 'salesInvoice'"
                          :rules="[(val) => !!val || 'Field is required']"
                          outlined
                          dense
                          class="full-width"
                          :options="products"
                          :option-value="'id'"
                          :option-label="'name'"
                          v-model="item.product"
                          label="Choose Product"
                        ></q-select>
                      </q-td>
                      <q-td class="col-sm-2 col-sm-grow col-xs-12">
                        <q-input
                          :rules="[
                            (val) => val > 0 || 'Must be greater than 0',
                          ]"
                          v-if="formType == 'salesInvoice'"
                          outlined
                          dense
                          type="number"
                          v-model="item.quantity"
                          mask="#"
                          label="Quantity"
                        ></q-input>
                      </q-td>
                      <q-td class="col-sm-2 col-sm-grow col-xs-12">
                        <q-input
                          :rules="[
                            (val) => val > 0 || 'Must be greater than 0',
                          ]"
                          v-if="formType == 'salesInvoice'"
                          outlined
                          dense
                          type="number"
                          v-model="item.price"
                          mask="#"
                          boardered
                          label="Price"
                        ></q-input>
                      </q-td>
                      <q-td class="col-sm-3 col-xs-12 text-center">
                        <div
                          v-if="formType == 'salesInvoice'"
                          class="col-md-2 col-sm-2 text-bold col-xs-1 q-pa-xs q-xs-pa-xs pa-xs-xs q-my-xs col-xs-4 text-grey text-bold text-body1"
                        >
                          {{ item.total_cost?.toFixed(2) }}
                        </div>
                      </q-td>
                    </div>
                  </q-tr>
                </template>
              </q-table>
            </div>
            <!-- </div> -->
            <!-- INVOICE -->

            <!-- EOF INVOICE -->
            <q-input
              v-if="formType == 'employees'"
              dense
              class="col-md-3 col-sm-3 col-xs-3 q-pa-xs q-xs-pa-xs"
              v-model="item.employee"
              label="Employee"
            ></q-input>
            <q-input
              v-if="formType == 'employees'"
              dense
              class="col-md-3 col-sm-3 col-xs-3 q-pa-xs q-xs-pa-xs"
              v-model="item.degination"
              label="Degination"
            ></q-input>
            <q-input
              v-if="formType == 'employees'"
              dense
              class="col-md-3 col-sm-3 col-xs-3 q-pa-xs q-xs-pa-xs"
              v-model="item.contact_number"
              label="Contact Number"
            ></q-input>
            <q-input
              v-if="formType == 'employees'"
              dense
              class="col-md-3 col-sm-3 col-xs-3 q-pa-xs q-xs-pa-xs"
              v-model="item.emergency_contact_number"
              label="Emergency Contact No"
            ></q-input>
            <q-input
              v-if="formType == 'employees'"
              dense
              class="col-md-3 col-sm-3 col-xs-3 q-pa-xs q-xs-pa-xs"
              v-model="item.address"
              label="Address"
            ></q-input>
          </div>

          <div class="row justify-center col-12" v-if="formType == 'clients'">
            <div
              class="col-md-3 col-sm-12 col-xs-12 q-pa-xs row justify-center"
              v-if="formType == 'employees'"
            >
              <q-input
                dense
                class="col-md-5 col-sm-3 col-xs-12 q-pa-xs q-xs-pa-xs"
                v-model="item.employee"
                label="Full Name"
              ></q-input>
              <q-input
                dense
                class="col-md-5 col-sm-3 col-xs-12 q-pa-xs q-xs-pa-xs"
                v-model="item.contact_no"
                label="Contact No"
              ></q-input>

              <q-input
                type="file"
                dense
                class="col-md-11 col-xs-9 col-sm-3 col-xs-12 q-pa-xs q-xs-pa-xs"
                v-model="item.employee_dp"
                hint="Employee DP"
              ></q-input>
            </div>

            <!-- EMPLOYEE -->
            <div
              class="col-md-3 q-pa-xs col-sm-12 q-pa-xs col-xs-12 row justify-center"
              v-if="formType == 'employees'"
            >
              <q-input
                dense
                class="col-md-5 col-sm-3 col-xs-12 q-pa-xs q-xs-pa-xs"
                v-model="item.address"
                label="Address"
              ></q-input>
              <q-input
                dense
                class="col-md-5 col-sm-3 col-xs-12 q-pa-xs q-xs-pa-xs"
                v-model="item.emergency_contact_no"
                label="Emergency Contact No"
              ></q-input>
              <q-input
                dense
                class="col-md-5 col-sm-3 col-xs-12 q-pa-xs q-xs-pa-xs"
                v-model="item.degination"
                label="Degination"
              ></q-input>

              <q-input
                v-if="formType == 'employees'"
                type="file"
                dense
                class="col-md-5 q-pa-xs col-xs-6 col-sm-6 col-xs-12 q-pa-xs q-xs-pa-xs"
                v-model="item.image"
                hint="citizenship (front and back side)"
              ></q-input>
            </div>
            <div v-if="formType == 'clients'" class="col-12">
              <q-card class="q-pa-sm q-my-md">
                <div class="row q-gutter-xs">
                  <q-input
                    v-if="formType == 'clients'"
                    outlined
                    dense
                    class="col-3 col-grow"
                    v-model="item.client"
                    label="Client"
                  ></q-input>
                  <q-input
                    v-if="formType == 'clients'"
                    outlined
                    class="col-3 col-grow"
                    dense
                    v-model="item.vat_number"
                    label="Vat No"
                  ></q-input>
                  <q-input
                    v-if="formType == 'clients'"
                    outlined
                    dense
                    class="col-3 col-grow"
                    v-model="item.pan_number"
                    label="Pan Number"
                  ></q-input>
                </div>

                <div class="row q-gutter-xs">
                  <q-input
                    outlined
                    dense
                    class="col-3 col-grow"
                    v-model="item.address_line_1"
                    label="Address line 1"
                  ></q-input>
                  <q-input
                    outlined
                    dense
                    class="col-3 col-grow"
                    v-model="item.address_line_2"
                    label="Address line 2"
                  ></q-input>
                  <q-input
                    outlined
                    dense
                    class="col-3 col-grow"
                    v-model="item.phone_number"
                    label="Phone Number"
                  ></q-input>
                </div>
              </q-card>
            </div>
          </div>

          <div class="q-py-sm">
            <q-btn
              v-if="multipleFields.length >= 2"
              dense
              round
              color="red-4"
              no-caps
              @click="removeThisProduct(item)"
              >-
            </q-btn>
          </div>
        </div>
      </q-card>

      <q-separator inset class="q-ma-xs"></q-separator>
      <div
        class="text-h5 text-bold bg-grey-2"
        v-if="formType == 'salesInvoice'"
      >
        <div class="row q-pa-sm q-px-md text-grey">
          <div class="col-6 text-left">TOTAL</div>

          <div class="col-6 text-right">
            Rs
            {{ getInvoiceTotal() }} /-
          </div>
        </div>
      </div>
      <q-separator inset class="q-ma-xs"></q-separator>

      <div
        v-if="formType == 'salesInvoice' || formType == 'clients'"
        class="q-pa-xs row justify-between"
      >
        <div class="col-9">
          <q-input dense outlined v-model="invoice.remarks" label="Remarks" />
        </div>
        <div class="col-2">
          <q-input
            outlined
            dense
            type="number"
            v-model="invoice.shipping_charge"
            label="Shipping Charge (Rs)"
          />
        </div>

        <div class="col-12 q-py-sm text-right q-mt-lg">
          <q-btn
            rounded
            no-caps
            class="bg-primary q-my-xs text-white"
            type="submit"
            :label="submitName"
          />
        </div>
      </div>
    </q-form>
  </div>
</template>

<script>
import { ref, reactive, computed } from "vue";
export default {
  emitOptions: ["formDetails"],
  props: {
    formType: { type: String },
    submitName: { type: String },
    products: { type: Array },
    clients: { type: Array },
    addMoreLabel: { type: String },
    searchLabel: { type: String },
    userProfile: { type: Object },
    employees: { type: Array },
  },
  setup(props, context) {
    const invoice = reactive({});
    const title = "Invoice";
    const options = ref([]);
    const columns = [
      {
        name: "product",
        label: "Product",
        field: (row) => row?.product?.name,
        align: "left",
        sortable: true,
      },
      {
        name: "quantity",
        label: "Quantity",
        field: "quantity",
        align: "right",
        sortable: true,
      },
      {
        name: "price",
        label: "Price",
        field: "price",
        align: "right",
        sortable: true,
      },
    ];
    const getInvoiceTotal = () =>
      searchableMultipleFields.value.reduce((ac, i) => {
        return ac + i.total_cost;
      }, 0);
    // watch(
    //   (props.userProfile,
    //   (newVal, oldVal) => {
    //     invoice.employee = props.userProfile?.email;
    //   })
    // );
    let searchProduct = ref(null);
    const multipleFields = ref([
      {
        id: 1,
        price: null,
        quantity: null,
        get total_cost() {
          if (this.price && this.quantity)
            return totalAmount(this.price, this.quantity);
          return 0;
        },
      },
      // {
      //   id: 2,
      //   price: 0,
      //   quantity: 0,
      //   get total() {
      //     if (this.price && this.quantity)
      //       return totalAmount(this.price, this.quantity);
      //     return 0;
      //   },
      // },
      // {
      //   id: 3,
      //   price: 0,
      //   quantity: 0,
      //   get total() {
      //     if (this.price && this.quantity)
      //       return totalAmount(this.price, this.quantity);
      //     return 0;
      //   },
      // },
      // {
      //   id: 4,
      //   price: 0,
      //   quantity: 0,
      //   get total() {
      //     if (this.price && this.quantity)
      //       return totalAmount(this.price, this.quantity);
      //     return 0;
      //   },
      // },
    ]);

    onMounted(() => {
      let today = new Date();
      let year = today.getUTCFullYear();
      let month = today.getMonth();
      let day = today.getDate();
      invoice.date = `${year}-${month}-${day}`;
    });
    const searchableMultipleFields = computed(() => {
      if (searchProduct.value) {
        return multipleFields.value.filter((i) =>
          i.product?.name
            ?.toLowerCase()
            .includes(searchProduct.value.toLowerCase())
        );
      } else {
        return multipleFields.value;
      }
    });

    function totalAmount(price, quantity) {
      return price * quantity;
    }

    function addMoreProduct() {
      let a = {
        price: null,
        quantity: null,
        get total_cost() {
          if (this.price && this.quantity)
            return totalAmount(this.price, this.quantity);
          return 0;
        },
      };

      if (multipleFields.value.length < 2) a.id = 2;
      else {
        a.id = multipleFields.value[multipleFields.value.length - 1]["id"] + 1;
      }
      multipleFields.value.push(a);
    }
    // invoice.total = ;

    function removeThisProduct(stock) {
      let index = multipleFields.value.findIndex((item) => item.id == stock.id);
      multipleFields.value.splice(index, 1);
    }

    // watch(
    //   () => invoice.employee,
    //   (oldVal, newVal) => {
    //     let employeeId = invoice?.employee?.id;
    //     console.log(props.employees.find((i) => i.id == employeeId));
    //   }
    // );

    watch(
      () => invoice.client,
      (oldVal, newVal) => {
        let clientId = invoice?.client?.id;
        invoice.pan_number = props.clients.find(
          (i) => i.id == clientId
        ).pan_number;
        invoice.vat_number = props.clients.find(
          (i) => i.id == clientId
        ).vat_number;
        invoice.contact_no = props.clients.find(
          (i) => i.id == clientId
        ).contact_number;
        invoice.payment_status = "DUE";
      }
    );

    function submitForm() {
      invoice.value = {
        ...invoice,
        products: multipleFields.value,
        total_cost: getInvoiceTotal(),
      };

      context.emit("formDetails", invoice.value);
    }

    return {
      title,
      getInvoiceTotal,
      columns,
      options,
      searchProduct,
      searchableMultipleFields,
      invoice,
      multipleFields,
      addMoreProduct,
      removeThisProduct,
      submitForm,
    };
  },
};
</script>
<style>
.sticky-bar {
  position: sticky;
  top: 50px;
  z-index: 1; /* Ensure the sticky bar appears above other content */
}
</style>
