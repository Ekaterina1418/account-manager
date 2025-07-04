<template>
  <Button
    type="button"
    severity="contrast"
    icon="pi pi-plus-circle"
    @click="store.addEmtyAccount"
  />
  <div>
    <div v-for="(account, idx) in accountsForForm" :key="account.id">
      <AccountForm
        :initial-values="account"
        @remove="store.removeAccount(account.id)"
        @valid="onValid(account.id, $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { Button } from 'primevue'
import AccountForm from './components/AccountForm.vue'
import { useAccountsStore } from '../store/AccountsStore'
import type { IAccount, IAccountForm } from './types'
const store = useAccountsStore()

const accountsForForm = computed(() =>
  store.accounts.map((acc) => ({
    ...acc,
    label: acc.label.map((l) => l.text).join('; '),
  })),
)
onMounted(() => {
  store.fetchAccounts()
})

const parseLabel = (raw: string) => {
  return raw
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((text) => ({ text }))
}
const onValid = async (id: string, values: IAccountForm) => {
  const password = values.type === 'ldap' ? null : values.password
  const label = parseLabel(values.label)
  const accountToSave: IAccount = {
    ...values,
    id,
    password,
    label,
  }

  store.updateAccount(accountToSave)
  await store.saveAccountToServer(accountToSave)
}
</script>
