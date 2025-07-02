<template>
  <div class="account-form">
    <div class="field">
      <label>Метка</label>
      <InputText :maxlength="50" placeholder="Введите метки через ;" v-model="model!.label" />
    </div>
    <div class="field">
      <label>Тип записи</label>
      <Select
        placeholder="Выберите тип"
        :options="typeOptions"
        optionLabel="label"
        optionValue="value"
        v-model="model!.type"
      />
    </div>
    <div class="field">
      <label>Логин *</label>
      <InputText :maxlength="100" required placeholder="Логин" v-model="model!.login" />
    </div>
    <div class="field">
      <label>Пароль *</label>
      <Password
        :maxlength="100"
        required
        toggleMask
        placeholder="Пароль"
        v-model="model!.password"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Select, InputText, Password } from 'primevue'
import { typeOptions } from '../utils'

const model = defineModel<{
  label: string
  type: string
  login: string
  password: string | null
}>()
</script>
<style scoped>
.account-form {
  display: flex;
  gap: 10px;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 1rem;
}
</style>
