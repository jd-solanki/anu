import AFloating from './AFloating.vue'

export * from './events'
export { sameWidth as sameWidthFloatingUIMiddleware } from './middlewares'
export * from './props'
export { AFloating }

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type AFloating = InstanceType<typeof AFloating>
