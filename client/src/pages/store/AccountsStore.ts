import { defineStore } from "pinia";
import { ref } from "vue";
import type { IAccount } from "../types";

export const useAccountsStore = defineStore('accounts',() => {
    const accounts = ref<IAccount[]>([])
    const apiBase = 'http://localhost:3000'

     const fetchAccounts = async() => {
      const result = await fetch(`${apiBase}/accounts`)
      accounts.value =  await result.json()
     }
return {
    accounts,
    fetchAccounts
}
})