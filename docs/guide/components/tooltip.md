<script lang="ts" setup>
import api from '@anu/component-meta/ATooltip.json';
</script>

# Tooltip

<!-- 👉 Basic -->
:::::card Basic

Use `ATooltip` component's `text` prop to show passed text in tooltip.

You can also use `default` slot to render custom content.

::::code DemoTooltipBasic
<<< @/components/demos/tooltip/DemoTooltipBasic.vue{3,9-14}
::::

::::after-demo
:::tip
While rendering custom content, You can use `.a-tooltip-text` class to add default styles of tooltip text.
:::
::::

:::::

<!-- 👉 Trigger -->
::::card Trigger

To open menu on click use set `trigger` prop to `click`.

:::code DemoTooltipTrigger
<<< @/components/demos/tooltip/DemoTooltipTrigger.vue{12}
:::

::::

<!-- 👉 v-model support -->
::::card v-model support

`ATooltip` also support `v-model` to show/hide tooltip.

:::code DemoTooltipVModelSupport
<<< @/components/demos/tooltip/DemoTooltipVModelSupport.vue{11,17}
:::

::::

<!-- 👉 Delay -->
:::::card Delay

You can delay showing and hiding of tooltip by setting `delay` (_show delay_) and `hideDelay` props.

::::code DemoTooltipDelay
<<< @/components/demos/tooltip/DemoTooltipDelay.vue{5-6}
::::

::::after-demo
:::tip `delay` - DX focused prop name
As we regularly configure delay for showing tooltip only and not for hiding, we named prop for delaying tooltip `delay` instead of `showDelay`.
:::
::::

:::::

<!-- 👉 Transition -->
::::card Transition

`ATooltip` also support transition. Default transition is `slide-y`. Set it to available transition to use different transition. e.g. `transition="fade"`.

To disable the transition you can set `transition` prop to `null`.

:::code DemoTooltipTransition
<<< @/components/demos/tooltip/DemoTooltipTransition.vue{4}
:::

::::

<!-- 👉 Placement -->
::::card Placement

As `ATooltip` uses [Floating UI](https://floating-ui.com/), you can configure how tooltip is rendered.

To adjust the placement of tooltip, use `placement` prop. This will get directly passed to Floating UI as show in their [docs](https://floating-ui.com/docs/computePosition#placement).

:::code DemoTooltipPlacement
<<< @/components/demos/tooltip/DemoTooltipPlacement.vue{4,26,35}
:::

:::tip ✨ Auto Placement
If there's not enough space to render the tooltip on given position then it will update the position according to available space.
:::

::::

<!-- 👉 Strategy -->
::::card Strategy

Set which positioning strategy to use to render the tooltip. This is also Floating UI option, for more details please read the official docs [here](https://floating-ui.com/docs/computeposition#strategy).

:::code DemoTooltipStrategy
<<< @/components/demos/tooltip/DemoTooltipStrategy.vue{5}
:::

::::

<!-- 👉 Middleware -->
::::card Middleware

`ATooltip` has some middleware as default to render the tooltip content correctly. You can also customize the middleware you want.

In below demo we are not using any middleware so tooltip component won't behave like above tooltip contents. e.g. Flipping tooltip content if there's not enough space won't work.

`middleware` prop accepts function that must return array of middleware. Please refer to the code snippet of this demo for function signature.

You can read more about middleware on their official [docs](https://floating-ui.com/docs/computePosition#middleware).

:::code DemoTooltipMiddleware
<<< @/components/demos/tooltip/DemoTooltipMiddleware.vue{2-8,14}
:::

::::

<!-- 👉 API -->
## API

<Api title="Tooltip" :api="api"></Api>
