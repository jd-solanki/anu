<script lang="ts" setup>
import api from '@anu/component-meta/AMenu.json';
</script>

# Menu

<!-- 👉 Basic -->
::::card Basic

`AMenu` allows creating menu with various options to customize the behavior.

:::code DemoMenuBasic
<<< @/components/demos/menu/DemoMenuBasic.vue{12-14}
:::

::::

<!-- 👉 Trigger -->
::::card Trigger

To open menu on hover use set `trigger` prop to `hover`.

:::code DemoMenuTrigger
<<< @/components/demos/menu/DemoMenuTrigger.vue{12}
:::

::::

<!-- 👉 v-model support -->
::::card v-model support

`AMenu` also support `v-model` to show/hide menu.

:::code DemoMenuVModelSupport
<<< @/components/demos/menu/DemoMenuVModelSupport.vue{11,17}
:::

::::

<!-- 👉 Persistence -->
::::card Persistence

Use `persist` prop to adjust the persistence of menu.

Default value is `false`, it will close the menu on any click. Set it to `true` to persist it on outside click. You can use `persist="content"` to persist menu to content only, means if you click on content menu won't close however outside click of content will close the menu.

:::code DemoMenuPersistence
<<< @/components/demos/menu/DemoMenuPersistence.vue{13,20}
:::

::::

<!-- 👉 Transition -->
::::card Transition

`AMenu` also support transition. Default transition is `slide-y`. Set it to available transition to use different transition. e.g. `transition="fade"`.

To disable the transition you can set `transition` prop to `null`.

:::code DemoMenuTransition
<<< @/components/demos/menu/DemoMenuTransition.vue{12}
:::

::::

<!-- 👉 Placement -->
::::card Placement

As `AMenu` uses [Floating UI](https://floating-ui.com/), you can configure how menu is rendered.

To adjust the placement of menu, use `placement` prop. This will get directly passed to Floating UI as show in their [docs](https://floating-ui.com/docs/computePosition#placement).

:::code DemoMenuPlacement
<<< @/components/demos/menu/DemoMenuPlacement.vue{13-26,42}
:::

:::tip ✨ Auto Placement
If there's not enough space to render the menu on given position then it will update the position according to available space.
:::

::::

<!-- 👉 Strategy -->
::::card Strategy

Set which positioning strategy to use to render the menu. This is also Floating UI option, for more details please read the official docs [here](https://floating-ui.com/docs/computeposition#strategy).

:::code DemoMenuStrategy
<<< @/components/demos/menu/DemoMenuStrategy.vue{12}
:::

::::

<!-- 👉 Middleware -->
::::card Middleware

`AMenu` has some middleware as default to render the menu content correctly. You can also customize the middleware you want.

In below demo we are not using any middleware so menu component won't behave like above menu contents. e.g. Flipping menu content if there's not enough space won't work.

`middleware` prop accepts function that must return array of middleware. Please refer to the code snippet of this demo for function signature.

You can read more about middleware on their official [docs](https://floating-ui.com/docs/computePosition#middleware).

:::code DemoMenuMiddleware
<<< @/components/demos/menu/DemoMenuMiddleware.vue{9-15,20}
:::

::::

<!-- 👉 API -->
## API

<Api title="Menu" :api="api"></Api>
