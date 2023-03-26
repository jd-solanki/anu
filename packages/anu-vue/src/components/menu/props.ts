import type { ExtractPropTypes } from 'vue'
import { floatingProps } from '@/components/floating'

export const menuProps = Object.fromEntries(
  Object.entries(floatingProps).filter(([k, _]) => k !== 'referenceEl'),
)

export type MenuProps = ExtractPropTypes<typeof menuProps>
