<script lang="ts" setup>
import { ref } from 'vue';

const showFade = ref(false)
</script>

# Transitions

:::card Introduction

Anu provides useful transitions for your application and it also uses it internally. You can transition of most of the components to any of the transitions provided by Anu.

Additionally, you can also create your own transitions via `createTransition` function provided by Anu.

Transitions components in Anu has pattern `A<transition-name>Transition` (_e.g. `AFadeTransition`_) and transition name will be used as the name of the transition. For example, If you create a transition component for bounce `createTransition('bounce')` then name it `ABounceTransition` and you can use it as `<SomeComponent transition="bounce">`. Don't forget to write the styles for this transition. <i class="i-fluent-emoji-grinning-face-with-sweat"></i>

:::

::::card Naming Convention

Transition names are adopted from [Vuetify](https://vuetifyjs.com/en/styles/transitions/) as it has perfect names because these names are even compatible with [logical directions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties).

Do note that, these transitions however isn't similar to vuetify's in terms of implementation and transition as well. This is because we followed graph directions to implement these transitions.

<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M4 21h17v-2H5V3H3v17a1 1 0 0 0 1 1z"/></svg>

Y <i class="i-bx-up-arrow-alt"></i>

X <i class="i-bx-right-arrow-alt"></i>

In above graph, if we go in Y direction, then we have to move up so our Slide Y & Scroll Y transitions will start from bottom and will move up. Similarly, if we go in X direction, then we have to move right so our Slide X & Scroll X transitions will start from left and will move right.

### Demo

<br>

:::code DemoFeaturesTransitionDemo
<<< @/components/demos/features/transition/DemoFeaturesTransitionDemo.vue
:::

::::

<!-- 👉 Customizing Transitions -->
::::card Customizing Transitions

You can also customize the transition duration and timing via CSS variables.

If you want to change the duration of fade transition then you can override `--fade-opacity-duration` CSS var and if you want to change the timing function then you can override `--fade-opacity-timing` CSS var.

Similarly, If some transition has multiple transitions going on then you can override `--<transition-name>-<property>-duration` and `--<transition-name>-<property>-timing` CSS vars. For example, for `slide-x` transition you can override `--slide-x-transform-duration` and `--slide-x-transform-timing` CSS vars.

Apart from this, You can even change the transitioning value in case of transitions like `slide-x` via `--slide-x-transform-translateX` CSS var.

<br>

:::code DemoFeaturesTransitionCustomizingTransition
<<< @/components/demos/features/transition/DemoFeaturesTransitionCustomizingTransition.vue{5}
:::

:::after-demo
If you noticed, Tooltip now starts animating from bottom 14px (_increased_) instead of default 8px via `[--slide-y-translateY:14px]` class.

Go hack the transitions and make them your own. <i class="i-fluent-emoji-smiling-face-with-sunglasses"></i>
:::

::::

<!-- 👉 Creating Custom Transition Components -->
::::card Creating Custom Transition Components

Anu provides `createTransition` composable to create your own transition components that you can reuse. This composable takes a transition name as an argument and returns a transition component.

```ts
import { createTransition } from 'anu-vue'

export const AFadeTransition = createTransition('fade')
```

You have transition component now, but you have to write the styles for it. You can write the styles for your transition component in the same way as you write for any other transition.

Here's example of fade transition styles used in anu.

<<< @/../packages/anu-vue/src/scss/index.scss#fade-transition

::::
