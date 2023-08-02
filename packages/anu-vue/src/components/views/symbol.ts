import type { useSelection } from 'anu-vue/composables/useSelection'
import type { InjectionKey } from 'vue'

// Export active view symbol
export const ActiveViewSymbol = Symbol('activeView')
export const ViewGroupModel = Symbol('ViewGroupModel') as InjectionKey<ReturnType<typeof useSelection>>
