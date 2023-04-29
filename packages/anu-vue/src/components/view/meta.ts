import type { ComponentObjectPropsOptions } from 'vue'

// ℹ️ Make sure to checkout meta definition rules

// 👉 Props
export interface AViewProps {
  value?: any
}

export const aViewProps = ({
  value: {
    type: null,
    default: undefined,
  },
} as const) satisfies Required<ComponentObjectPropsOptions<AViewProps>>

// 👉 Slots
export const aViewSlots = {} as const

// 👉 Events
export interface AViewEvents {}
