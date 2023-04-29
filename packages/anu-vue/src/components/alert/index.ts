import AAlert from './AAlert.vue'

export * from './meta'
export { AAlert }

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type AAlert = InstanceType<typeof AAlert>
