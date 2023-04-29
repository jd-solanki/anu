import AMenu from './AMenu.vue'

export * from './meta'
export { AMenu }

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type AMenu = InstanceType<typeof AMenu>
