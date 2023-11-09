import type { Plugin } from 'colord'
import { colord, extend } from 'colord'
import a11yPlugin from 'colord/plugins/a11y'
import harmonies from 'colord/plugins/harmonies'
import namesPlugin from 'colord/plugins/names'

extend([a11yPlugin, namesPlugin, harmonies])

declare module 'colord/colord' {
  interface Colord {
    contrasting(): Colord
    toHslValue(): string
  }
}

export const contrastingPlugin: Plugin = ColordClass => {
  ColordClass.prototype.contrasting = function () {
    const isLight = this.isLight()

    // let color = this
    // while(color.contrast(this) < 4.5) color = isLight ? color.darken(0.4) : color.lighten(0.4)

    // return color
    return isLight ? colord('#000') : colord('#fff')
  }

  ColordClass.prototype.toHslValue = function () {
    const { h, s, l, a } = this.toHsl()

    return `${h} ${s}% ${l}%${a !== 1 ? ` / ${a}` : ''}`
  }
}

extend([contrastingPlugin])

export { colord }
