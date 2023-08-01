<template>
  <div class="row justify-center col-11">
    <q-form
      ref="newInvoice"
      @submit="submitForm"
      class="col-md-12 q-pa-xs-xs shadow-9 q-pa-xs col-xs-12"
    >
      <div class="row">
        <div
          class="col-md-3 col-xs-grow q-pa-md q-xs-pa-xs q-pa-xs-xs"
          v-if="formType == 'salesInvoice'"
        >
          <q-input
            v-if="formType == 'salesInvoice'"
            dense
            v-model="invoice.bill_number"
            type="number"
            label="Bill No"
          ></q-input>
        </div>

        <div class="col-md-3 col-xs-grow q-pa-md q-pa-xs-xs">
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
                      <q-btn v-close-popup label="Close" color="primary" flat />
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
        <div
          v-if="formType == 'salesInvoice'"
          class="col-md-3 col-xs-grow q-pa-md q-pa-xs-xs"
        >
          <q-select
            style="min-width: 220px; max-width: 220px"
            dense
            :options="employees"
            :option-value="'id'"
            :option-label="'full_name'"
            v-model="invoice.employee"
            label="Employee"
          ></q-select>
        </div>
        <div
          v-if="formType == 'salesInvoice'"
          class="col-md-3 col-xs-grow q-pa-md q-pa-xs-xs"
        >
          <q-input dense v-model="invoice.title" label="Title"></q-input>
        </div>
        <div
          v-if="formType == 'salesInvoice'"
          class="col-md-3 q-pa-md q-pa-xs-xs col-xs-grow"
        >
          <q-select
            style="min-width: 220px; max-width: 220px"
            dense
            :options="clients"
            :option-value="'id'"
            :option-label="'client_name'"
            v-model="invoice.client"
            label="Client"
          ></q-select>
        </div>
      </div>
      <div v-if="formType == 'salesInvoice'" class="row">
        <div
          v-if="formType == 'salesInvoice'"
          class="col-md-3 col-xs-grow q-pa-md q-pa-xs-xs"
        >
          <q-input dense v-model="invoice.pan_number" label="Pan No"></q-input>
        </div>
        <div
          v-if="formType == 'salesInvoice'"
          class="col-md-3 col-xs-grow q-pa-md q-pa-xs-xs"
        >
          <q-input dense v-model="invoice.vat_number" label="Vat No"></q-input>
        </div>

        <div class="col-md-3 q-pa-md q-pa-xs-xs col-xs-grow">
          <q-input
            dense
            v-model="invoice.contact_no"
            label="Contact No"
          ></q-input>
        </div>

        <div
          class="col-md-3 q-pa-md q-pa-xs-xs col-xs-grow"
          v-if="formType == 'salesInvoice'"
        >
          <q-select
            dense
            style="min-width: 220px; max-width: 220px"
            use-input
            :options="['CURRENT']"
            v-model="invoice.payment_status"
            label="Payment Status"
          ></q-select>
        </div>
      </div>
      <div class="sticky-bar">
        <q-bar class="bg-grey-4 row justify-end q-pa-lg">
          <q-space></q-space>

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
          <q-space></q-space>
          <q-btn
            rounded
            style="padding-top: 0px; padding-bottom: 0px"
            class="bg-secondary text-white justify-end"
            @click="addMoreProduct()"
          >
            {{ addMoreLabel }}
          </q-btn>
          <div class="p-pa-sm text-secondary">
            <div class="q-px-xs text-center text-caption text-bold">
              {{ multipleFields.length }}
              - Items
            </div>
          </div>
          <q-space></q-space>
        </q-bar>
      </div>

      <div
        class="row justify-center q-py-md"
        v-for="(item, index) in searchableMultipleFields"
        :key="index"
      >
        <div
          class="row justify-center col-9"
          v-if="
            formType == 'clients' ||
            formType == 'products' ||
            formType == 'salesInvoice'
          "
        >
          <q-input
            v-if="formType == 'clients'"
            dense
            class="col-md-3 col-sm43 col-xs-3 q-pa-xs q-xs-pa-xs"
            v-model="item.client"
            label="Client"
          ></q-input>
          <q-input
            v-if="formType == 'clients'"
            class="col-md-3 col-sm-3 col-xs-3 q-pa-xs q-xs-pa-xs"
            dense
            v-model="item.vat_number"
            label="Vat No"
          ></q-input>
          <q-input
            v-if="formType == 'clients'"
            dense
            class="col-md-3 col-sm-3 col-xs-3 q-pa-xs q-xs-pa-xs"
            v-model="item.pan_number"
            label="Pan Number"
          ></q-input>
          <q-input
            v-if="formType == 'products'"
            dense
            class="col-md-3 col-sm-3 col-xs-3 q-pa-xs q-xs-pa-xs"
            v-model="item.product"
            label="Product"
          ></q-input>
          <q-input
            v-if="formType == 'products'"
            dense
            class="col-md-3 col-sm-3 col-xs-3 q-pa-xs q-xs-pa-xs"
            v-model="item.brand"
            label="Brand"
          ></q-input>
          <q-input
            v-if="formType == 'products'"
            dense
            class="col-md-3 col-sm-3 col-xs-3 q-pa-xs q-xs-pa-xs"
            v-model="item.size"
            label="Size"
          ></q-input>

          <q-select
            v-if="formType == 'salesInvoice'"
            dense
            :options="products"
            :option-value="'id'"
            :option-label="'name'"
            class="col-md-3 col-sm-3 col-xs-6 q-pa-xs q-xs-pa-xs"
            v-model="item.product"
            label="Product"
          ></q-select>
          <q-input
            v-if="formType == 'salesInvoice'"
            dense
            type="number"
            class="col-md-3 col-sm-3 col-xs-3 q-pa-xs q-xs-pa-xs"
            v-model="item.price"
            mask="#"
            label="price"
          ></q-input>

          <q-input
            v-if="formType == 'salesInvoice'"
            dense
            type="number"
            class="col-md-3 col-sm-3 col-xs-3 q-pa-xs q-xs-pa-xs"
            v-model="item.quantity"
            mask="#"
            label="Quantity"
          ></q-input>
          <div
            v-if="formType == 'salesInvoice'"
            class="col-md-1 col-sm-1 col-xs-1 q-pa-xs q-xs-pa-xs pa-xs-xs q-ma-md text-caption col-xs-4"
          >
            {{ item.total?.toFixed(2) }}
          </div>
        </div>
        <div class="row justify-center col-9" v-if="formType == 'clients'">
          <div
            class="col-md-3 col-sm-12 col-xs-12 q-pa-md row justify-center"
            v-if="formType == 'employees'"
          >
            <q-input
              dense
              class="col-md-5 col-sm-3 col-xs-12 q-pa-md q-xs-pa-xs"
              v-model="item.employee"
              label="Full Name"
            ></q-input>
            <q-input
              dense
              class="col-md-5 col-sm-3 col-xs-12 q-pa-md q-xs-pa-xs"
              v-model="item.contact_no"
              label="Contact No"
            ></q-input>

            <q-input
              type="file"
              dense
              class="col-md-11 col-xs-9 col-sm-3 col-xs-12 q-pa-md q-xs-pa-xs"
              v-model="item.employee_dp"
              hint="Employee DP"
            ></q-input>
          </div>
          <div
            class="col-md-3 q-pa-md col-sm-12 q-pa-md col-xs-12 row justify-center"
            v-if="formType == 'employees'"
          >
            <q-input
              dense
              class="col-md-5 col-sm-3 col-xs-12 q-pa-md q-xs-pa-xs"
              v-model="item.address"
              label="Address"
            ></q-input>
            <q-input
              dense
              class="col-md-5 col-sm-3 col-xs-12 q-pa-md q-xs-pa-xs"
              v-model="item.emergency_contact_no"
              label="Emergency Contact No"
            ></q-input>
            <q-input
              dense
              class="col-md-5 col-sm-3 col-xs-12 q-pa-md q-xs-pa-xs"
              v-model="item.degination"
              label="Degination"
            ></q-input>

            <q-input
              v-if="formType == 'employees'"
              type="file"
              dense
              class="col-md-5 q-pa-md col-xs-6 col-sm-6 col-xs-12 q-pa-md q-xs-pa-xs"
              v-model="item.image"
              hint="citizenship (front and back side)"
            ></q-input>
          </div>
          <div v-if="formType == 'clients'" class="col-9 row justify-center">
            <q-input
              dense
              class="col-4 q-ma-xs"
              v-model="item.address_line_1"
              label="Address line 1"
            ></q-input>
            <q-input
              dense
              class="col-4 q-ma-xs"
              v-model="item.address_line_2"
              label="Address line 2"
            ></q-input>
          </div>
        </div>
        <div
          style="display: flex; justify-content: center; align-items: center"
        >
          <q-btn
            v-if="multipleFields.length >= 2"
            dense
            round
            color="grey"
            no-caps
            @click="removeThisProduct(item)"
            >-
          </q-btn>
        </div>
      </div>

      <q-separator inset class="q-ma-xs"></q-separator>

      <div class="text-bold bg-grey-4" v-if="formType == 'salesInvoice'">
        <div class="row justify-between">
          <div class="col-6 text-center">Total</div>

          <div class="col-6 text-center">
            {{
              searchableMultipleFields.reduce((ac, i) => {
                return ac + i.total;
              }, 0)
            }}
          </div>
        </div>
      </div>
      <q-separator inset class="q-ma-xs"></q-separator>
      <div
        v-if="formType == 'salesInvoice' || formType == 'clients'"
        class="q-pa-md"
      >
        <q-input dense type="text" v-model="invoice.remarks" label="Remarks">
        </q-input>
      </div>

      <div class="row justify-end">
        <q-btn
          rounded
          no-caps
          class="bg-primary q-ma-md text-white"
          type="submit"
          >{{ submitName }}</q-btn
        >
      </div>
    </q-form>
  </div>
</template>

<script>
import { client } from "process";
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
    const options = ref([]);
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
        price: 0,
        quantity: 0,
        get total() {
          if (this.price && this.quantity)
            return totalAmount(this.price, this.quantity);
          return 0;
        },
      },
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
        price: 0,
        quantity: 0,
        get total() {
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

    watch(
      () => invoice.employee,
      (oldVal, newVal) => {
        let employeeId = invoice?.employee?.id;
        console.log(props.employees.find((i) => i.id == employeeId));
      }
    );
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
        invoice.payment_status = "CURRENT";
      }
    );

    function submitForm() {
      invoice.value = {
        ...invoice,
        products: multipleFields.value,
      };

      context.emit("formDetails", invoice.value);
    }

    return {
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
