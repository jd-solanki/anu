import AList from './AList.vue'

export * from './meta'
export { AList }

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type AList = InstanceType<typeof AList>
