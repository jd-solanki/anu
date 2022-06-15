import { defineComponent } from 'vue';

export const ACheckbox = defineComponent({
    name: 'ACheckbox',
    props: {
        modelValue: Boolean,
        label: String,
        icon: {
            type: String,
            default: 'i-bx-check'
        }
    },
    setup(props, { slots, attrs, emit }) {
        const elementId = `a-checkbox-${attrs.id || attrs.value || Math.floor(Math.random() * 1000)}`

        return () => <label class={['inline-flex items-center cursor-pointer']} for={elementId}>
            <input
                id={elementId}
                type="checkbox"
                checked={props.modelValue}
                class="hidden next:checked:border-primary children:next:checked:scale-full next:checked:bg-primary"
                onChange={(event) => emit('update:modelValue', (event.target as HTMLInputElement).checked)}
            />
            <div class="h-5 w-5 border-2 border-solid border-[hsl(var(--border-color))] border-rounded flex items-center justify-center shrink-0 transition transition-border duration-200 mr-2">
                <i class={[props.icon, "shrink-0 scale-0 transition duration-150 delay-100 ease-[cubic-bezier(.57,1.48,.87,1.09)] text-white"]} />
            </div>
            {slots.default?.()}
        </label>
    },
})

export type ACheckbox = InstanceType<typeof ACheckbox>
