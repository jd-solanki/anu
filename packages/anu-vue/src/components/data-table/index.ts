import ADataTable from './ADataTable.vue'

export * from './meta'
export { ADataTable }

/* eslint-disable @typescript-eslint/no-redeclare */
// TODO: (types) Vue shouldn't throw this error
// @ts-expect-error Vue shouldn't throw this error
export type ADataTable = InstanceType<typeof ADataTable>
/* eslint-enable */
