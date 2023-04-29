import AFloating from './AFloating.vue'

export * from './meta'
export { sameWidth as sameWidthFloatingUIMiddleware } from './middlewares'
export { AFloating }

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type AFloating = InstanceType<typeof AFloating>
