import { LocalStorage } from "quasar";
import { api } from "../../boot/axios";

export async function postEmployees(employee) {
  try {
    console.log(employee, "employees");
    const response = await api.post("api/hrmsystem/employee/", employee);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function getEmployees() {
  try {
    const response = await api.get("api/hrmsystem/employee/");
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
