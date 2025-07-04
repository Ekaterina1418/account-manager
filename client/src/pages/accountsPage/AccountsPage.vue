<template>
  <div class="header">
    <Button
      type="button"
      severity="contrast"
      icon="pi pi-plus-circle"
      @click="store.addEmtyAccount"
    />
  </div>
  <div class="form" v-for="(account, idx) in accountsForForm" :key="account.id">
    <AccountForm
      :initial-values="account"
      @remove="store.removeAccount(account.id)"
      @valid="onValid(account.id, $event)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { Button } from 'primevue'
import AccountForm from './components/AccountForm.vue'
import { useAccountsStore } from '../store/AccountsStore'
import type { IAccount, IAccountForm } from './types'
const store = useAccountsStore()

const accountsForForm = computed(() => store.accounts)

onMounted(() => {
  store.fetchAccounts()
})

const onValid = async (id: string, values: IAccountForm) => {
  if (!values.login || values.login.trim() === '') {
    return
  }
  const password = values.type === 'ldap' ? null : values.password
  const accountToSave: IAccount = {
    ...values,
    id,
    password,
  }
  store.updateAccount(accountToSave)
  await store.saveAccountToServer(accountToSave)
}
</script>
<style scoped>
.header {
  display: flex;
  margin-bottom: 60px;
}
.form {
  max-width: 1000px;
  min-width: 320px;
  margin-bottom: 10px;
}
@media (max-width: 925px) {
  .form {
    margin-bottom: 30px;
  }
}
</style>
