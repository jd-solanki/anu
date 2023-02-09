import type { ExtractPropTypes } from 'vue'
import { floatingProps } from '@/components/floating'

export const menuProps = reactivePick(floatingProps, Object.keys(floatingProps).filter(k => !['referenceEl'].includes(k)) as Array<keyof typeof floatingProps>)

export type CardProps = ExtractPropTypes<typeof menuProps>
