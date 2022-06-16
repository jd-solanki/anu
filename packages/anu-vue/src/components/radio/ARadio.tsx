import { color } from '@/composables/useProps';
import { isEleDisabled } from '@/utils/dom';
import { computed, defineComponent } from 'vue';

export const ARadio = defineComponent({
    name: 'ARadio',
    props: {
        color: {
            ...color,
            default: 'primary',
        },
        modelValue: String,
        label: String,
        icon: {
            type: String,
            default: 'i-bx-check'
        }
    },
    setup(props, { slots, attrs, emit }) {
        const elementId = `a-checkbox-${attrs.id || attrs.value || Math.floor(Math.random() * 1000)}`
        const isChecked = computed(() => props.modelValue === attrs.value)

        return () => <label class={['inline-flex items-center cursor-pointer']} for={elementId}>
            {/* TODO: Try to avoid classes like next:checked:xxx so we can omit them in safelist */}
            <input
                {...attrs}
                id={elementId}
                type="radio"
                checked={isChecked.value}
                class={["hidden"]}
                onChange={(event: Event) => emit('update:modelValue', (event.target as HTMLInputElement).value)}
            />
            <div class={[
                `after:bg-${props.color}`,
                isChecked.value ? `after:scale-full border-${props.color}` : 'after:scale-0',
                `${isEleDisabled(attrs) ? 'border-dotted opacity-50' : 'border-solid'}`,
                "h-5 w-5 border-(2 [hsl(var(--border-color))]) rounded-full mr-2 p-1 after:(w-full h-full rounded-full block content-empty transform transition transition-transform duration-250 ease-in-out)",
            ]} />
            {slots.default ? slots.default() : props.label}
        </label>
    },
})

export type ARadio = InstanceType<typeof ARadio>
