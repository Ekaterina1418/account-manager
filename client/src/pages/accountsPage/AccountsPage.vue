<template>
  <Button type="button" severity="contrast" icon="pi pi-plus-circle" />
  <div>
    <AccountForm v-model="newAccount" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button } from 'primevue'
import AccountForm from './components/AccountForm.vue'

const newAccount = ref({
  label: '',
  type: '',
  login: '',
  password: '',
})
</script>
