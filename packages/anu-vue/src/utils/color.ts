// Thanks: https://betterprogramming.pub/generate-contrasting-text-for-your-random-background-color-ac302dc87b4
// Thanks: https://css-tricks.com/converting-color-spaces-in-javascript/
interface RGB {
  b: number
  g: number
  r: number
}

const rgbToYIQ = ({ r, g, b }: RGB): number => {
  return ((r * 299) + (g * 587) + (b * 114)) / 1000
}

export const hexToRgb = (h: string): RGB | undefined => {
  // 3 digits
  if (h.length === 4) {
    return {
      r: Number(`0x${h[1]}${h[1]}`),
      g: Number(`0x${h[2]}${h[2]}`),
      b: Number(`0x${h[3]}${h[3]}`),
    }

  // 6 digits
  }
  else if (h.length === 7) {
    return {
      r: Number(`0x${h[1]}${h[2]}`),
      g: Number(`0x${h[3]}${h[4]}`),
      b: Number(`0x${h[5]}${h[6]}`),
    }
  }
}

export const contrast = (colorHex: string | undefined, threshold = 128): string => {
  if (colorHex === undefined)
    return 'var(--a-contrast-dark)'

  const rgb: RGB | undefined = hexToRgb(colorHex)

  if (rgb === undefined)
    return 'var(--a-contrast-dark)'

  return rgbToYIQ(rgb) >= threshold ? 'var(--a-contrast-dark)' : 'var(--a-contrast-light)'
}
