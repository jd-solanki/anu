import ALoader from './ALoader.vue'

export * from './meta'
export { ALoader }

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type ALoader = InstanceType<typeof ALoader>
