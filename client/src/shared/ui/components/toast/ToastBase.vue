<template>
  <Toast
    position="top-center"
    :pt="{
      message: () => ({
        style: {
          display: 'flex',
          padding: '10px',
          width: 'max-content',
          margin: '6px auto'
        }
      }),
      messageText: () => ({
        style: {
          display: 'block',
          color: 'var(--p-text-primary) !important'
        }
      }),
      messageIcon: () => ({
        style: {
          display: 'none'
        }
      }),
      detail: () => ({
        style: {
          'font-size': '16px'
        }
      })
    }"
  />
</template>

<script setup lang="ts">
import { Toast } from 'primevue'
</script>
