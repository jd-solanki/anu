import AViews from './AViews.vue'

export * from './meta'
export { AViews }

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type AViews = InstanceType<typeof AViews>
