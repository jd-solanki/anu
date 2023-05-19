import ATable from './ATable.vue'

export * from './meta'
export { ATable }

// eslint-disable-next-line @typescript-eslint/no-redeclare
// TODO: (types) Vue shouldn't throw this error
// @ts-expect-error
export type ATable = InstanceType<typeof ATable>
