<template>
  <Button type="button" severity="contrast" icon="pi pi-plus-circle" />
  <div>
   <div v-for="(account, idx) in store.accounts" :key="account.login || idx">
    <AccountForm v-model="store.accounts[idx]" />
  </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Button } from 'primevue'
import AccountForm from './components/AccountForm.vue'
import { useAccountsStore } from '../store/AccountsStore'
const store = useAccountsStore()

onMounted(() => {
  store.fetchAccounts()
})

console.log(store.accounts);

const newAccount = ref({
  label: '',
  type: '',
  login: '',
  password: '',
})
</script>
