import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import type { IAccount } from '../accountsPage/types'
import { apiBase, emptyForm } from '../accountsPage/utils/index'
import { apiRequest } from '@/app/api/baseApi'

export const useAccountsStore = defineStore('accounts', () => {
  const accounts = ref<IAccount[]>([])
  const error = ref<string | null>(null)
  const toast = useToast()

  const fetchAccounts = async () => {
    error.value = null
    try {
      const result = await apiRequest<IAccount[]>({
        url: `${apiBase}/accounts`,
        method: 'GET',
      })
      if (result) accounts.value = result
    } catch (err) {
      error.value = 'Ошибка при загрузке данных'
    }
  }

  const saveAccountToServer = async (account: IAccount) => {
    error.value = null
    try {
      if (account.isNew) {
        await apiRequest({
          url: `${apiBase}/accounts`,
          method: 'POST',
          data: { ...account, isNew: undefined },
          headers: { 'Content-Type': 'application/json' },
        })
        toast.add({ severity: 'info', summary: 'Аккаунт сохранён', life: 3000 })
      } else {
        await apiRequest({
          url: `${apiBase}/accounts/${account.id}`,
          method: 'PUT',
          data: account,
          headers: { 'Content-Type': 'application/json' },
        })
        toast.add({ severity: 'info', summary: 'Аккаунт обновлён', life: 3000 })
      }
    } catch (err) {
      error.value = 'Ошибка сохранения аккаунта'
    }
  }

  const removeAccount = async (id: string) => {
    error.value = null
    try {
      await apiRequest({
        url: `${apiBase}/accounts/${id}`,
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
      accounts.value = accounts.value.filter((acc) => acc.id !== id)
    } catch (err) {
      error.value = 'Ошибка удаления аккаунта'
    }
  }

  const addEmtyAccount = () => {
    accounts.value.push({
      ...emptyForm,
      id: crypto.randomUUID(),
      isNew: true,
    })
  }

  const updateAccount = (account: IAccount) => {
    const idx = accounts.value.findIndex((a) => a.id === account.id)
    if (idx >= 0) accounts.value[idx] = { ...account, isNew: false }
  }
  return {
    accounts,
    fetchAccounts,
    addEmtyAccount,
    updateAccount,
    saveAccountToServer,
    removeAccount,
  }
})
