import { objectKeys, objectPick } from '@antfu/utils';
import { createDefu } from "defu";
import type { Ref, StyleValue } from 'vue';
import { toValue } from 'vue';
import type { PluginOptions } from '../plugin';
import type { PluginOptionDefaults } from '../pluginDefaults';
import { ANU_PROPS_DEFAULTS } from '../symbols';

// export const mergePropsDefaults = deepmergeCustom({
//   mergeArrays: false,
// })

// TODO: This needs to be optimized
const uiMerger = createDefu((obj, key, val) => {
  if (typeof obj[key] === 'string' && typeof val === 'string') {
    obj[key] = [...new Set(val.split(' ')), ...new Set(obj[key].split(' '))].join(' ')
    return true
  }
})

export const mergePropsDefaults = createDefu((obj, key, val) => {
  // If it's array then replace it instead of merge
  if (Array.isArray(obj[key]) && Array.isArray(val)) {
    obj[key] = val
    return true
  }

  // if it's ui prop then deep merge it
  if (key === 'ui') {
    // console.log('val :>> ', val);
    // console.log('obj[key] :>> ', obj[key]);
    obj[key] = uiMerger(val, obj[key])
    // console.log('obj[key] :>> ', obj[key]);
    // console.log('\n\n');
    return true
  }
})

interface ReturnType<Props> {
  props: Props
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  const defaultsClass = ref() as ReturnType<Props>['defaultsClass']
  const defaultsStyle = ref() as ReturnType<Props>['defaultsStyle']
  const defaultsAttrs = ref() as ReturnType<Props>['defaultsAttrs']

  const calculateProps = () => {
    const _propsDefaults = toValue(propsDefaults)
    const { class: _class, style, attrs, ...restProps } = _propsDefaults[_componentName] || {}

    defaultsClass.value = _class
    defaultsStyle.value = style
    defaultsAttrs.value = attrs

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const componentProps = {} as any
    const otherProps = {} as any
    /* eslint-enable */

    Object.entries(restProps)
      .forEach(([key, value]) => {
        if (key in definitionProps) {
          // console.log('key :>> ', key);
          // console.log('value :>> ', toRaw(value));
          componentProps[key] = value
        }
        else
          otherProps[key] = value
      })

    // Provide subProps to the nested component
    // newDefaults.value = mergePropsDefaults(_propsDefaults, otherProps)
    /**
     * ℹ️ This line optimizes object by removing nested component's defaults from the current component tree
     * Assume we have { AAlert: { ABtn: { color: 'info' } } } then below line will move ABtn on top and remove it from children of AAlert
     * To see the difference log the result of `mergePropsDefaults(...)` of below line and comment line above
     */
    newPropsDefaults.value = mergePropsDefaults({ ..._propsDefaults, [_componentName]: componentProps }, otherProps)

    const explicitPropsNames = objectKeys(vm?.vnode.props || {}) as unknown as (keyof Props)[]
    const explicitProps = objectPick(definitionProps, explicitPropsNames)

    propsRef.value = mergePropsDefaults(definitionProps, componentProps, explicitProps) as Props
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