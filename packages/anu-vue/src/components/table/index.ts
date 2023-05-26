import ATable from './ATable.vue'

export * from './meta'
export { ATable }

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type ATable = ReturnType<typeof ATable>
