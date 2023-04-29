import ACard from './ACard.vue'

export * from './meta'
export { ACard }

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type ACard = InstanceType<typeof ACard>
