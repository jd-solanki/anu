import type { InjectionKey } from 'vue'
import type { useSelection } from '@/composables/useSelection'

// Export active view symbol
export const ActiveViewSymbol = Symbol('activeView')
export const ViewGroupModel = Symbol('ViewGroupModel') as InjectionKey<ReturnType<typeof useSelection>>
