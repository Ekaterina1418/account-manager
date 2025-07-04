<template>
  <div class="account-form">
    <div class="field">
      <label>Метка</label>
      <InputText
        :maxlength="50"
        placeholder="Введите метки через ;"
        v-model="label"
        @blur="onFieldBlur"
      />
      <div v-if="errors.login">{{ errors.label }}</div>
    </div>
    <div class="field">
      <label>Тип записи</label>
      <Select
        placeholder="Выберите тип"
        :options="typeOptions"
        optionLabel="label"
        optionValue="value"
        v-model="type"
        @change="() => onFieldBlur()"
      />
      <div v-if="errors.login">{{ errors.type }}</div>
    </div>
    <div class="field">
      <label>Логин *</label>
      <InputText
        :maxlength="100"
        required
        placeholder="Логин"
        v-model="login"
        @blur="onFieldBlur"
      />
      <div v-if="errors.login">{{ errors.login }}</div>
    </div>
    <div v-if="type === 'local'" class="field">
      <label>Пароль *</label>
      <Password
        :maxlength="100"
        required
        toggleMask
        placeholder="Пароль"
        v-model="password"
        @blur="onFieldBlur"
      />
      <div v-if="errors.login">{{ errors.password }}</div>
    </div>
    <Button type="button" severity="contrast" icon="pi pi-trash" @click="emit('remove')" />
  </div>
</template>

<script setup lang="ts">
import { Select, InputText, Password, Button } from 'primevue'
import { useForm } from 'vee-validate'
import { accountSchema } from '../utils/validations'
import { typeOptions } from '../utils'
import type { IAccountForm } from '../types'
import { watch } from 'vue'
const props = defineProps<{
  initialValues: IAccountForm
}>()
const emit = defineEmits<{
  (e: 'remove'): void
  (e: 'valid', payload: IAccountForm): void
}>()

const { handleSubmit, defineField, errors, resetForm } = useForm({
  validationSchema: accountSchema,
  initialValues: props.initialValues,
})
const [login] = defineField('login')
const [password] = defineField('password')
const [type] = defineField('type')
const [label] = defineField('label')

watch(
  () => props.initialValues,
  (val) => {
    resetForm({ values: val })
  },
  { immediate: true, deep: true },
)
const onFieldBlur = handleSubmit((values) => {
  emit('valid', values)
})
</script>
<style scoped>
.account-form {
  display: flex;
  align-items: center;
  gap: 16px;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.account-form .p-button {
  align-self: flex-end;
  height: 2.5rem;
}
</style>
