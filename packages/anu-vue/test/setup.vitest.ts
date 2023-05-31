import { afterAll, beforeAll, vi } from 'vitest'
import { createApp } from 'vue'
import ResizeObserver from 'resize-observer-polyfill'
import { plugin } from '../src/plugin'

vi.stubGlobal('ResizeObserver', ResizeObserver)

beforeAll(() => {
  const app = createApp({})
  app.use(plugin)
  global.app = app
})

afterAll(() => {
  delete global.app
})
