import { deepmerge } from 'deepmerge-ts'
import { type StyleValue } from 'vue'
import type { PluginOptionDefaults } from '@/pluginDefaults'
import { ANU_DEFAULTS } from '@/symbols'
import { pick } from '@/utils/helpers'
import { objectKeys } from '@/utils/typescripts'

interface ReturnType<Props> {
  props: Props
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultsClass: any
  defaultsStyle: StyleValue | undefined
  defaultsAttrs: Record<string, unknown> | undefined
}

export function useDefaults<Props extends Record<string, unknown>>(componentName: keyof PluginOptionDefaults, definitionProps: Props): ReturnType<Props> {
  const defaults = inject(ANU_DEFAULTS, {})

  // console.log('defaults :>> ', defaults);

  const vm = getCurrentInstance()

  const { class: defaultsClass, style: defaultsStyle, attrs: defaultsAttrs, ...restProps } = defaults[componentName] || {}

  // console.log('restProps :>> ', restProps);

  const { componentProps: defaultsProps, otherProps: subProps } = (() => {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const componentProps = {} as any
    const otherProps = {} as any
    /* eslint-enable */

    Object.entries(restProps)
      .forEach(([key, value]) => {
        if (key in definitionProps)
          componentProps[key] = value

        else
          otherProps[key] = value
      })

    return { componentProps, otherProps }
  })()

  // console.log('defaultsProps :>> ', defaultsProps);
  // console.log('subProps :>> ', subProps);
  // console.log('definitionProps :>> ', toRaw(definitionProps));

  // Provide subProps to the nested component
  provide(ANU_DEFAULTS, deepmerge(defaults, subProps))

  const propsRef = computedWithControl(
    () => definitionProps,
    () => {
      const explicitPropsNames = objectKeys(vm?.vnode.props || {}) as unknown as (keyof Props)[]
      const explicitProps = pick(definitionProps, ...explicitPropsNames)

      return deepmerge(definitionProps, defaultsProps, explicitProps) as Props
    },
  )

  watch(
    () => definitionProps,
    propsRef.trigger,
    { deep: true },
  )

  return {
    props: toReactive(propsRef),
    defaultsClass,
    defaultsStyle,
    defaultsAttrs,
  }
}
