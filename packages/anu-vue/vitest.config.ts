import { defineConfig, mergeConfig } from 'vitest/config'
import vitestBaseConfig from '../../vitest.config'
import viteConfig from './vite.config'

const vitestConfig = mergeConfig(vitestBaseConfig, defineConfig({
  test: {
    browser: {
      enabled: true,

      // @ts-expect-error ignore, we don't have the type here
      enableUI: true,
      name: 'chrome',
      headless: !!process.env.HEADLESS,
      provider: 'webdriverio',
    },
  },
}))

export default mergeConfig(viteConfig, vitestConfig)
