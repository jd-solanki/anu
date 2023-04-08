export * from './props'
export * from './slots'
export { ABaseInput }

import ABaseInput from './ABaseInput.vue'

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type ABaseInput = InstanceType<typeof ABaseInput>
