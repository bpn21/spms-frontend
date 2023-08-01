import { LocalStorage } from "quasar";
import { api } from "../../boot/axios";
import { Notify } from "quasar";

export async function postProducts(products) {
  try {
    const response = await api.post("api/sales/products/", products);
    debugger;
    Notify.create({
      color: "secondary",
      message: response.data.data,
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function getProducts(products) {
  try {
    const response = await api.get("api/sales/products/", products);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
