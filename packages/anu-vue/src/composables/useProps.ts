import type { PropType } from 'vue'

export const color = {
  type: String as PropType<'primary' | 'success' | 'info' | 'warning' | 'danger'>,
  validator: (value: string) => ['primary', 'success', 'info', 'warning', 'danger'].includes(value),
}
