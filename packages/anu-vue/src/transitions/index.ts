import { createTransition } from '@/composables/createTransition'

export const transitions = [
  'fade',
  'scale',
  'slide-y',
  'slide-y-reverse',
  'scroll-y',
  'scroll-y-reverse',
  'slide-x',
  'slide-x-reverse',
  'scroll-x',
  'scroll-x-reverse',
  'view-next',
  'view-previous',
] as const

export const AFadeTransition = createTransition('fade')
export const AScaleTransition = createTransition('scale')
export const ASlideYTransition = createTransition('slide-y')
export const ASlideYReverseTransition = createTransition('slide-y-reverse')
export const AScrollYTransition = createTransition('scroll-y')
export const AScrollYReverseTransition = createTransition('scroll-y-reverse')
export const ASlideXTransition = createTransition('slide-x')
export const ASlideXReverseTransition = createTransition('slide-x-reverse')
export const AScrollXTransition = createTransition('scroll-x')
export const AScrollXReverseTransition = createTransition('scroll-x-reverse')
export const AViewNextTransition = createTransition('view-next')
export const AViewPreviousTransition = createTransition('view-previous')

export type Transitions = typeof transitions[number]
