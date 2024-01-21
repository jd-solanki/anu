import type { Config } from 'tailwindcss';

import { pluginSkinDefault } from '@anu-vue/tailwind-skin-default';
import { iconsPlugin } from "@egoist/tailwindcss-icons";


export default {
  content: [
    "./src/**/*.{vue,md,js,ts,jsx,tsx}",
    "**/anu-vue.js**",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    iconsPlugin(),
    pluginSkinDefault({}),
  ],
} satisfies Config