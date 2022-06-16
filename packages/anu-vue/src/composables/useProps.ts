export const color = {
  type: String,
  validator: (value: string) => ['primary', 'success', 'info', 'warning', 'danger'].includes(value),
}
