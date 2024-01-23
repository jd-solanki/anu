import type { Config } from 'tailwindcss';

import { pluginSkinDefault } from '@anu-vue/tailwind-skin-default';
import { iconsPlugin } from "@egoist/tailwindcss-icons";


export default {
  content: [
    "./src/**/*.{vue,md,js,ts,jsx,tsx}",
    "**/anu-vue.js**",
    "./.vitepress/theme/index.ts"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    iconsPlugin(),
    pluginSkinDefault({ /* options */ }),
  ],
} satisfies Config