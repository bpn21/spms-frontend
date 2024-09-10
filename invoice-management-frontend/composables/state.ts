import { LocalStorage } from "quasar";

export const useAuthenticate = ()=> useState<Boolean>('isLoggedIn',()=>LocalStorage.getItem('token')?true:false)