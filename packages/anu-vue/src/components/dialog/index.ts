import ADialog from './ADialog.vue'

export * from './meta'
export { ADialog }

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type ADialog = InstanceType<typeof ADialog>
