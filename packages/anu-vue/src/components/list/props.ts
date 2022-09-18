import type { ComponentObjectPropsOptions } from 'vue'

export const props: ComponentObjectPropsOptions = {
  items: {
    type: Array,
    required: true,
  },
} as const
