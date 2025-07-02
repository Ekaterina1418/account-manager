import { defineStore } from "pinia";
import { ref } from "vue";

export const useAccountsStore = defineStore('accounts',() => {
    const accounts = ref([])
    const apiBase = 'http://localhost:3000'

     const fetchAccounts = async() => {
      const result = await fetch(`${apiBase}/accouts`)
      accounts.value =  await result.json()
     }
return {
    accounts,
    fetchAccounts
}
})