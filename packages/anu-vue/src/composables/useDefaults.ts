import type { PluginOptionDefaults } from '@/pluginDefaults';
import { ANU_DEFAULTS } from '@/symbols';
import { objectKeys, objectPick } from '@antfu/utils';
import { deepmergeCustom } from 'deepmerge-ts';
import type { Ref, StyleValue } from 'vue';
import { toValue } from 'vue';

export const mergePropsDefaults = deepmergeCustom({
  mergeArrays: false,
})

interface ReturnType<Props> {
  props: Props
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultsClass: Ref<any>
  defaultsStyle: Ref<StyleValue | undefined>
  defaultsAttrs: Ref<Record<string, unknown> | undefined>
}

export function useDefaults<Props extends Record<string, unknown>>(definitionProps: Props, componentName?: keyof PluginOptionDefaults): ReturnType<Props> {
  const propsDefaults = inject(ANU_DEFAULTS, {})

  const vm = getCurrentInstance()
  const _componentName = (componentName ?? vm?.type.name ?? vm?.type.__name) as keyof PluginOptionDefaults | undefined

  if (!_componentName)
    throw new Error('Unable to identify the component name. Please define component name or use the `componentName` parameter while using `useDefaults` composable.')

  // const propsRef = ref() as Ref<ReturnType<Props>['props']>
  const defaultsClass = ref() as ReturnType<Props>['defaultsClass']
  const defaultsStyle = ref() as ReturnType<Props>['defaultsStyle']
  const defaultsAttrs = ref() as ReturnType<Props>['defaultsAttrs']

  // ===

  // const componentProps = ref() as Ref<Props>
  const newDefaults = ref() as any

  provide(ANU_DEFAULTS, newDefaults)


  const propsRef = computed<ReturnType<Props>['props']>(() => {
    const _propsDefaults = toValue(propsDefaults)
    const { class: _class, style, attrs, ...restProps } = _propsDefaults[_componentName] || {}

    defaultsClass.value = _class
    defaultsStyle.value = style
    defaultsAttrs.value = attrs

    // console.log('restProps :>> ', restProps);

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

    // Provide subProps to the nested component
    // provide(ANU_DEFAULTS, mergePropsDefaults(propsDefaults, otherProps))
    // newDefaults.value = mergePropsDefaults(propsDefaults, otherProps)
    newDefaults.value = mergePropsDefaults(propsDefaults, otherProps)


    const explicitPropsNames = objectKeys(vm?.vnode.props || {}) as unknown as (keyof Props)[]
    const explicitProps = objectPick(definitionProps, explicitPropsNames)

    return mergePropsDefaults(definitionProps, componentProps, explicitProps) as Props
  })


  // watch(
  //   [() => definitionProps, () => toValue(propsDefaults)],
  //   calculateProps,
  //   { deep: true, immediate: true },
  // )

  return {
    props: toReactive(propsRef),
    defaultsClass,
    defaultsStyle,
    defaultsAttrs,
  }
}
