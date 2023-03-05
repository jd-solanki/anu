import type { ExtractPropTypes } from 'vue'
import { floatingProps } from '@/components/floating'

// TODO: Maybe we don't need reactivePick, Normal Object filter will do the job.
export const menuProps = reactivePick(floatingProps, Object.keys(floatingProps).filter(k => !['referenceEl'].includes(k)) as Array<keyof typeof floatingProps>)

export type MenuProps = ExtractPropTypes<typeof menuProps>
