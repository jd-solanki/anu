import AView from './AView.vue'

export * from './meta'
export { AView }

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type AView = InstanceType<typeof AView>
