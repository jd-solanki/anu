import AConfig from './AConfig.vue'

export * from './meta'
export { AConfig }

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type AConfig = InstanceType<typeof AConfig>
