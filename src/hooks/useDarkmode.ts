import { ref } from 'vue'

// Respect system preference
const prefersDarkScheme = window.matchMedia('(prefers-color-cheme: dark)').matches
export const isDark = ref(prefersDarkScheme)

export function useDarkmode () {
  return {
    isDark,
    toggle: () => { isDark.value = !isDark.value },
    on: () => { isDark.value = true },
    off: () => { isDark.value = false }
  }
}
