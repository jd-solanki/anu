import { getCurrentInstance } from 'vue'
import { anu, presetAnu, presetIconExtraProperties } from 'anu-vue'
import { presetThemeDefault } from '@anu-vue/preset-theme-default'
import presetIcons from '@unocss/preset-icons'
import presetUno from '@unocss/preset-uno'

let installed = false

loadUnocssPreset()
await loadUnocss()

// import anu styles and reset
await loadStyle('#ANU_STYLE#'); // import 'anu-vue/dist/style.css'
await loadStyle('#ANU_THEME_STYLE#'); // import '@anu-vue/preset-theme-default/dist/style.css'
await loadStyle('#UNO_RESET#'); // @use '@unocss/reset/tailwind.css'

export function setupAnu() {
  if (installed) return
  const instance = getCurrentInstance()
  instance.appContext.app.use(anu)
  installed = true
}

function loadStyle(href) {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.addEventListener('load', resolve);
      link.addEventListener('error', reject);
      document.body.append(link);
    });
}

function loadUnocss() {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/@unocss/runtime'
    script.addEventListener('load', resolve)
    script.addEventListener('error', reject)
    document.body.append(script)
  })
}

export function loadUnocssPreset() {
  window.__unocss = {
    presets: [
      presetUno(),
      presetIcons({
        scale: 1.2,
        extraProperties: presetIconExtraProperties,
      }),
      // anu-vue preset
      presetAnu(),
      // default theme preset
      presetThemeDefault(),
    ],
  }
}
