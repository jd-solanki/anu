import { useVModel } from '@vueuse/core'
import { computed, defineComponent } from 'vue'
import { color as colorProps, disabled } from '@/composables/useProps'

export const ASwitch = defineComponent({
  name: 'ASwitch',
  props: {
    color: {
      ...colorProps,
      default: 'primary',
    },
    label: {
      type: String,
      default: undefined,
    },
    modelValue: {
      type: [Boolean, Array],
      default: false,
    },
    onIcon: {
      type: String,
      required: false,
      default: undefined,
    },
    offIcon: {
      type: String,
      required: false,
      default: undefined,
    },
    disabled,
  },
  emits: ['update:modelValue'],
  setup(props, { slots, attrs, emit }) {
    const elementId = `a-switch-${attrs.id || attrs.value || Math.floor(Math.random() * 1000)}`
    const data = useVModel(props, 'modelValue', emit)

    const dotPosition = computed(() => {
      if (!data.value)
        return { transform: 'translateX(0)' }
      else return { transform: 'translateX(calc(var(--a-switch-track-size) - 100% - (var(--a-switch-thumb-margin) *2 )))' }
    })

    return () => <label class={[props.label || slots.default ? 'flex' : 'inline-flex', 'a-switch cursor-pointer uno-layer-base-rounded-full justify-between items-center', props.disabled && 'a-switch-disabled pointer-events-none']} for={elementId}>
        <input v-model={data.value} class="hidden" type="checkbox" role="switch" id={elementId} checked={data.value} />

        {/* 👉 Label */}
        {slots.default ? slots.default() : props.label}

        {/* 👉 Switch */}
        {/* min width should be double the dot size */}
        <div class={[data.value ? `bg-${props.color}` : 'bg-[hsl(var(--a-switch-default-color))]', 'a-switch-toggle flex rounded-inherit min-w-[var(--a-switch-track-size)]']}>
            <div class="a-switch-dot grid place-items-center rounded-inherit m-[var(--a-switch-thumb-margin)]" style={dotPosition.value}>
              <div class={[data.value ? `${props.onIcon} text-${props.color}` : props.offIcon, 'a-switch-icon color-[var(--a-switch-icon-color)]']}></div>
            </div>
        </div>

    </label>
  },
})

export type ASwitch = InstanceType<typeof ASwitch>
