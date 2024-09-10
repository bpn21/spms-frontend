import { LocalStorage } from "quasar";
import { api } from "../../boot/axios";
import { Notify } from "quasar";
// const $q = useQuasar();

export async function postClients(client) {
  try {
    console.log(client, "client is here");
    const response = await api.post("api/hrmsystem/clients/", client);

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getClients(email, password) {
  try {
    const response = await api.get("api/hrmsystem/clients/");

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
