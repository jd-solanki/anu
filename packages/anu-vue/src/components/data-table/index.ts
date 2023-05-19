import ADataTable from './ADataTable.vue'

export * from './meta'
export { ADataTable }

// eslint-disable-next-line @typescript-eslint/no-redeclare
// TODO: (types) Vue shouldn't throw this error
// @ts-expect-error
export type ADataTable = InstanceType<typeof ADataTable>
