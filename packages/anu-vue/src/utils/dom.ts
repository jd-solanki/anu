export const isEleDisabled = (attrs: Object) => Object.prototype.hasOwnProperty.call(attrs, 'disabled')
export const isEleReadonly = (attrs: Object) => Object.prototype.hasOwnProperty.call(attrs, 'readonly')
export const isEleInteractive = (attrs: Object) => !(isEleDisabled(attrs) || isEleReadonly(attrs))
