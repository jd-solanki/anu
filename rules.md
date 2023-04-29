# rules

- Always use `cmeta` snippet for generating the meta (props, slots, events) of a new component.
- Make sure to use PropType from interface when asserting component prop types. E.g. `content: [Number, String] as PropType<ABadgeProps['content']>`
  - If you have provided default for your prop, make sure to wrap prop's type in `NoUndefined` when needed

- Slots in meta must have `as const`
