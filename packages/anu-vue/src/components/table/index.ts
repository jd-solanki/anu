import ATable from './ATable.vue'

export * from './meta'
export { ATable }

/* eslint-disable @typescript-eslint/no-redeclare */
// TODO: (types) Vue shouldn't throw this error
// @ts-expect-error Vue shouldn't throw this error
export type ATable = InstanceType<typeof ATable>
/* eslint-enable */
