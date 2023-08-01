import { api } from "../../boot/axios";
import { Notify } from "quasar";

export async function postInvoiceDetails(invoice) {
  try {
    invoice.employee = invoice.employee.id;
    invoice.client = invoice.client.id;
    invoice.products.forEach((item) => {
      item.product = parseInt(item.product.id);
      item.price = parseFloat(item.price);
      item.quantity = parseFloat(item.quantity);
    });
    console.log(invoice, "item is here");
    const response = await api.post("api/sales/invoice/", invoice).then(() => {
      Notify.create({
        color: "secondary",
        message: "Invoice Created",
      });
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
