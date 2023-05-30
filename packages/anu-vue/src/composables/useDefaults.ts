import { deepmergeCustom } from 'deepmerge-ts'
import { type StyleValue } from 'vue'
import type { PluginOptionDefaults } from '@/pluginDefaults'
import { ANU_DEFAULTS } from '@/symbols'
import { pick } from '@/utils/helpers'
import { objectKeys } from '@/utils/typescripts'

const mergePropsDefaults = deepmergeCustom({
  mergeArrays: false,
})

interface ReturnType<Props> {
  props: Props
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultsClass: any
  defaultsStyle: StyleValue | undefined
  defaultsAttrs: Record<string, unknown> | undefined
}

export function useDefaults<Props extends Record<string, unknown>>(definitionProps: Props, componentName?: keyof PluginOptionDefaults): ReturnType<Props> {
  const defaults = inject(ANU_DEFAULTS, {})

  // console.log('defaults :>> ', defaults);

  const vm = getCurrentInstance()
  const _componentName = (componentName ?? vm?.type.name ?? vm?.type.__name) as keyof PluginOptionDefaults | undefined

  if (!_componentName)
    throw new Error('Unable to identify the component name. Please define component name or use the `componentName` parameter while using `useDefaults` composable.')

  const { class: defaultsClass, style: defaultsStyle, attrs: defaultsAttrs, ...restProps } = defaults[_componentName] || {}

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
  provide(ANU_DEFAULTS, mergePropsDefaults(defaults, subProps))

  const propsRef = computedWithControl(
    () => definitionProps,
    () => {
      const explicitPropsNames = objectKeys(vm?.vnode.props || {}) as unknown as (keyof Props)[]
      const explicitProps = pick(definitionProps, ...explicitPropsNames)

      return mergePropsDefaults(definitionProps, defaultsProps, explicitProps) as Props
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
