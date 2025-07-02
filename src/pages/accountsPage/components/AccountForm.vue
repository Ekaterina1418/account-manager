<template>
  <div class="account-form">
    <div class="field">
      <label>Метка</label>
      <InputText :maxlength="50" placeholder="Введите метки через ;" />
    </div>
    <div class="field">
      <label>Тип записи</label>
      <Select placeholder="Выберите тип" />
    </div>
    <div class="field">
      <label>Логин *</label>
      <InputText :maxlength="100" required placeholder="Логин" />
    </div>
    <div class="field">
      <label>Пароль *</label>
      <Password :maxlength="100" required toggleMask placeholder="Пароль" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Select, InputText, Password } from 'primevue'
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
