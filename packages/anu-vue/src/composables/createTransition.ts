import { capitalize } from 'anu-vue/utils/helpers'
import { Transition, TransitionGroup, defineComponent, h } from 'vue'

export function createTransition(name: string) {
  return defineComponent({
    name: `A${capitalize(name)}Transition`,
    props: {
      group: Boolean,
      tag: {
        type: String,
        default: 'div',
      },
    },
    setup(props, { attrs, slots }) {
      return () => h(
        props.group ? TransitionGroup : Transition as any,
        {
          name: `${name}`,
          tag: props.group ? props.tag : undefined,
          class: [
            props.group && `${name}-group`,
          ],
          ...attrs,
        },
        () => slots.default?.(),
      )
    },
  })
}
