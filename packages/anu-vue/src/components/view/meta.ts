import type { ExtractPublicPropTypes } from 'vue'

// ℹ️ Make sure to checkout meta definition rules

// 👉 Props
export const aViewProps = {
  value: {
    type: null,
    default: undefined,
  },
} as const
export type AViewProps = ExtractPublicPropTypes<typeof aViewProps>

// 👉 Slots
export const aViewSlots = {} as const
