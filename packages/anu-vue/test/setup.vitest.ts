import { afterAll, beforeAll, vi } from 'vitest'
import { createApp } from 'vue'
import ResizeObserver from 'resize-observer-polyfill'
import { plugin } from '../src/plugin'

vi.stubGlobal('ResizeObserver', ResizeObserver)

beforeAll(() => {
  // eslint-disable-next-line vue/require-name-property
  const app = createApp({})
  app.use(plugin)
  globalThis.app = app
})

afterAll(() => {
  delete globalThis.app
})
