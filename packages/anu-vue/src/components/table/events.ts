/*
  Events can't get registered if we import interface maybe due to same props import interface issue

  Usage:

  const emit = defineEmits<
  TableEvents<
    Exclude<(ExtractPropTypes<typeof props>)['cols'], undefined>
  >
>()
*/
export interface TableEvents<HeaderClickCol> {
  (e: 'click:header', col: HeaderClickCol): void
}
