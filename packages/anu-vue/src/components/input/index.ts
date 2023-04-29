import AInput from './AInput.vue'

export * from './meta'
export { AInput }

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type AInput = InstanceType<typeof AInput>
