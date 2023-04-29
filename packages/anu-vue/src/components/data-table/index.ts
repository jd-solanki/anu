import ADataTable from './ADataTable.vue'

export * from './meta'
export { ADataTable }

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type ADataTable = InstanceType<typeof ADataTable>
