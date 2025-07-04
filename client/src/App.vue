<template>
  <main class="main-layout">
    <ToastBase />
    <router-view />
  </main>
</template>
<script setup lang="ts">
import ToastBase from './shared/ui/components/toast/ToastBase.vue'
</script>
<style scoped>
.main-layout {
  padding: 32px 24px;
  overflow: hidden;
}
</style>
