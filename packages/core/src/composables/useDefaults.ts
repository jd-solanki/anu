import { objectKeys, objectPick } from '@antfu/utils'
import { deepmergeCustom } from 'deepmerge-ts'
import { createDefu } from 'defu'
import type { Ref, StyleValue } from 'vue'
import { toValue } from 'vue'
import type { PluginOptions } from '../plugin'
import type { PluginOptionDefaults } from '../pluginDefaults'
import { ANU_PROPS_DEFAULTS } from '../symbols'

export const customDeepMerge = deepmergeCustom({
  mergeArrays: false,
})

const defuUi = createDefu((obj, key, value) => {
  if (typeof obj[key] === 'string' && typeof value === 'string') {
    obj[key] = `${obj[key]} ${value}` as typeof value
    return true
  }
  return false
})

export const mergePropsDefaults = deepmergeCustom({
  mergeArrays: false,
  mergeRecords(values, utils, meta) {
    if (meta?.key === 'ui' && Array.isArray(values)) {
      // @ts-expect-error Can't able to understand that `values` is an array
      return defuUi(...values)
    }

    return utils.actions.defaultMerge
  },
})

interface ReturnType<Props> {
  props: Props
  defaultsClass: Ref<any>
  defaultsStyle: Ref<StyleValue | undefined>
  defaultsAttrs: Ref<Record<string, unknown> | undefined>
}

export function useDefaults<Props extends Record<string, unknown>>(definitionProps: Props, componentName?: keyof PluginOptionDefaults): ReturnType<Props> {
  const vm = getCurrentInstance()
  const _componentName = (componentName ?? vm?.type.name ?? vm?.type.__name) as keyof PluginOptionDefaults | undefined

  if (!_componentName)
    throw new Error('Unable to identify the component name. Please define component name or use the `componentName` parameter while using `useDefaults` composable.')

  // Get defaults
  const propsDefaults = inject(ANU_PROPS_DEFAULTS, {})

  // New defaults
  const newPropsDefaults = ref({}) as Ref<PluginOptions['propsDefaults']>

  // ℹ️ Pass new reactive value to avoid updates in upward tree
  provide(ANU_PROPS_DEFAULTS, newPropsDefaults)

  // Return Values
  const propsRef = ref() as Ref<ReturnType<Props>['props']>
  const defaultsClass = ref()
  const defaultsStyle = ref() as ReturnType<Props>['defaultsStyle']
  const defaultsAttrs = ref()

  const calculateProps = () => {
    const _propsDefaults = toValue(propsDefaults)
    const { class: _class, style, attrs, ...restProps } = _propsDefaults[_componentName] || {}

    defaultsClass.value = _class
    defaultsStyle.value = style
    defaultsAttrs.value = attrs

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const componentProps = {} as any
    const otherProps = {} as any

    Object.entries(restProps)
      .forEach(([key, value]) => {
        if (key in definitionProps) {
          // console.log('key :>> ', key);
          // console.log('value :>> ', toRaw(value));
          componentProps[key] = value
        }
        else { otherProps[key] = value }
      })

    // Provide subProps to the nested component
    // newDefaults.value = customDeepMerge(_propsDefaults, otherProps)
    /**
     * ℹ️ This line optimizes object by removing nested component's defaults from the current component tree
     * Assume we have { AAlert: { ABtn: { color: 'info' } } } then below line will move ABtn on top and remove it from children of AAlert
     * To see the difference log the result of `customDeepMerge(...)` of below line and comment line above
     */
    newPropsDefaults.value = customDeepMerge({ ..._propsDefaults, [_componentName]: componentProps }, otherProps)

    const explicitPropsNames = objectKeys(vm?.vnode.props || {}) as unknown as (keyof Props)[]
    const explicitProps = objectPick(definitionProps, explicitPropsNames)

    // console.log('_componentName :>> ', _componentName);
    // console.log('definitionProps :>> ', toRaw(definitionProps));
    // console.log('componentProps :>> ', toRaw(componentProps));
    // console.log('explicitProps :>> ', toRaw(explicitProps));
    // console.log('otherProps :>> ', toRaw(otherProps));

    const _compDefaults = customDeepMerge(definitionProps, explicitProps)
    // console.log('_compDefaults :>> ', _compDefaults);

    propsRef.value = mergePropsDefaults(_compDefaults, componentProps) as Props
    // console.log('\n\n');
    // console.log('propsRef.value :>> ', toRaw(propsRef.value));
  }

  watch(
    [
      () => definitionProps,
      () => toValue(propsDefaults),
    ],
    calculateProps,
    {
      deep: true,
      immediate: true,
    },
  )

  return {
    props: toReactive(propsRef) as Props,
    defaultsClass,
    defaultsStyle,
    defaultsAttrs,
  }
}
