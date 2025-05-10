// stores/counter.js
import { api } from "./../boot/axios";
import { defineStore } from "pinia";
import { LocalStorage } from "quasar";
import { getInvoiceDetails } from "~/data/inovice/invoice";

export const useInvoiceStore = defineStore("invoice", {
  state: () => {
    return {
      invoices: null,
    };
  },

  actions: {
    async invoiceDetails() {
      try {
        const res = await getInvoiceDetails();
        this.invoices = res.data;
        return res.data;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
});
