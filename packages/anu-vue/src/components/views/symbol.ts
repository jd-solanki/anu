import type { InjectionKey } from 'vue'
import type { useGroupModel } from '@/composables'

// Export active view symbol
export const ActiveViewSymbol = Symbol('activeView')
export const ViewGroupModel = Symbol('ViewGroupModel') as InjectionKey<ReturnType<typeof useGroupModel>>
