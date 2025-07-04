<template>
  <div class="account-form">
    <div class="field">
      <label>Метка</label>
      <InputText
        :maxlength="50"
        placeholder="Введите метки через ;"
        v-model="labelString"
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
        :invalid="!!errors?.['type']"
        style="height:39px;"
      />
      <div v-if="errors.login">{{ errors.type }}</div>
    </div>
    <div class="field" :class="{ 'password-full': type === 'ldap' }">
      <label>Логин *</label>
      <InputText
        :maxlength="100"
        required
        placeholder="Логин"
        autocomplete="off"
        v-model="login"
        @blur="onFieldBlur"
        :invalid="!!errors?.['login']"
      />
      <div class="input-error-holder">
    <span v-if="errors.login" class="input-error">{{ errors.login }}</span>
  </div>
    </div>
    <div v-show="type === 'local'" class="field">
      <label>Пароль *</label>
      <Password
        :maxlength="100"
        required
        toggleMask
        :feedback="false"
        placeholder="Пароль"
        autocomplete="off"
        v-model="password"
        @blur="onFieldBlur"
       :inputClass="{ 'p-invalid': !!errors?.['password'] }"
      />
     <div class="input-error-holder">
    <span v-if="errors.password" class="input-error">{{ errors.password }}</span>
  </div>
    </div>
    <Button type="button" severity="danger" icon="pi pi-trash" @click="emit('remove')" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
// @ts-expect-error: No type definitions for lodash-es
import { isEqual } from 'lodash-es'
import { Select, InputText, Password, Button } from 'primevue'
import { useForm } from 'vee-validate'
import { accountSchema } from '../utils/validations'
import { typeOptions } from '../utils'
import type { IAccountForm } from '../types'

const props = defineProps<{
  initialValues: IAccountForm
}>()

const isFirstLoad = ref(true)
const labelString = ref((props.initialValues.label || []).map(l => l.text).join('; ')
)
const prevValues = ref({ ...props.initialValues })

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

watch(
  () => props.initialValues,
  (val) => {
    resetForm({ values: val })
      isFirstLoad.value = true
  },
  { immediate: true, deep: true },
)

const onFieldBlur = handleSubmit((values) => {
  const hasData = values.login && values.login.trim() !== ''
  
  if (!hasData) {
    return 
  }
  const labels = labelString.value
    .split(';')
    .map(t => t.trim())
    .filter(Boolean)
    .map(text => ({ text }))

  const current = { ...values, label: labels }
  if (!isEqual(current, prevValues.value)) {
    emit('valid', current)
    prevValues.value = { ...current } 
  }
})
</script>
<style scoped>
.account-form {
  display: flex;
    align-items: flex-start;
  gap: 16px;
  width: 100%;
}
.field {
 flex: 1 1 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.field label {
 color: #6B7280;
}
.password-full {
 flex: 2 1 0;
}
.account-form .p-button {
  align-self: center;
  min-width: 40px;
  height: 2.5rem;
}

.input-error {
  color: #ed7c7c;
}
.input-error-holder {
  min-height: 18px;  
  line-height: 18px;
  display: block;
}
:deep(.p-inputtext) {
  width: 100%;
}
:deep(.p-password .p-inputtext.p-invalid) {
  border: 1px solid #ed7c7c;
}
:deep(.input-text) {
  min-height: 40px;
}
@media (max-width: 925px) {
  .account-form {
    flex-direction: column;
    gap: 12px;
  }
  .field {
    width: 100%;
    flex: 1 1 100%;
  }
  .password-full {
    flex: 1 1 100%;
  }
  .account-form .p-button {
    width: 100%;
  }
}
</style>
