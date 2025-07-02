import { definePreset } from '@primevue/themes'
import Aura from '@primevue/themes/aura'

const CustomPreset = definePreset(Aura, {
  semantic: {
    primary: '#10B981', // зеленый основной
    secondary: '#F3F4F6', // светлый для фона/вторичных
    accent: '#F59E42', // акцент: кнопки, выделения
    error: '#EF4444', // ошибки
    success: '#22C55E', // успех
    info: '#3B82F6', // информационный
    warning: '#FBBF24', // предупреждение
    dark: '#22292F', // тёмный текст
    light: '#F9FAFB', // светлый фон для input/field
  },
  colorScheme: {
    light: {
      bg: {
        primary: '#FFFFFF',
        secondary: '#F3F4F6',
      },
      text: {
        main: '#22292F',
        secondary: '#6B7280',
      },
    },
  },
})
const PrimeVueConfig = {
  theme: {
    preset: CustomPreset,
    options: {
      prefix: 'p',
      cssLayer: false,
    },
  },
}
export default PrimeVueConfig
