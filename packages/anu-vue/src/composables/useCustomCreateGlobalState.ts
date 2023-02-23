// ℹ️ Waiting for: https://github.com/vueuse/vueuse/pull/2790

export type CreateGlobalStateReturn<T> = (...args: any[]) => T

/**
 * Keep states in the global scope to be reusable across Vue instances.
 *
 * @see https://vueuse.org/createGlobalState
 * @param stateFactory A factory function to create the state
 */
export function createCustomGlobalState<T>(
  stateFactory: (...args: any[]) => T,
): CreateGlobalStateReturn<T> {
  let initialized = false
  let state: T
  const scope = effectScope(true)

  return (...args: any[]) => {
    if (!initialized) {
      state = scope.run(() => stateFactory(...args))!
      initialized = true
    }

    return state
  }
}
