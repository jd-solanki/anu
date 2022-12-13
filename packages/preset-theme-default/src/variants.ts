import type { CSSEntries, Preset } from '@unocss/core'

const variants: Preset['variants'] = [
  // `em:` variant converts rem unit into em
  (matcher: string) => {
    if (!matcher.startsWith('em:'))
      return matcher

    return {
      // slice `em:` prefix and passed to the next variants and rules
      matcher: matcher.slice(3),
      body: (body: CSSEntries) => {
        body.forEach(v => {
          // v[1] can also be number
          if (typeof v[1] === 'string') {
            if (v[1].endsWith('rem'))
              v[1] = `${v[1].slice(0, -3)}em`

            // Handle spacing variant usage\
            else if (v[1].endsWith('rem * var(--a-spacing, 1))'))
              v[1] = `${v[1].slice(0, -26)}em * var(--a-spacing, 1))`
          }
        })

        return body
      },
    }
  },

  // `spacing:` variant adds --a-spacing CSS var
  (matcher: string) => {
    if (!matcher.startsWith('spacing:'))
      return matcher

    return {
      // slice `spacing:` prefix and passed to the next variants and rules
      matcher: matcher.slice(8),
      body: (body: CSSEntries) => {
        body.forEach(v => {
          v[1] = `calc(${v[1]} * var(--a-spacing, 1))`
        })

        return body
      },
    }
  },
]

export { variants }
