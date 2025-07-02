<template>
  <Button type="button" severity="contrast" icon="pi pi-plus-circle" />
  <div>
    <AccountForm />
  </div>
</template>

<script setup lang="ts">
import { Button } from 'primevue'
import AccountForm from './components/AccountForm.vue'
</script>
