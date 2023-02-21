import { afterAll, beforeAll } from 'vitest'
import { createApp } from 'vue'
import { plugin } from '../src/plugin'

beforeAll(() => {
  const app = createApp({})
  app.use(plugin)
  global.app = app
})

afterAll(() => {
  delete global.app
})
