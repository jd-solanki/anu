import ABaseInput from './ABaseInput.vue'

export * from './meta'
export { ABaseInput }

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type ABaseInput = InstanceType<typeof ABaseInput>
