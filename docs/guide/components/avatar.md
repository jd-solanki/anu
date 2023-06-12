<script lang="ts" setup>
import api from '@anu/component-meta/AAvatar.json';
</script>

# Avatar

<!-- 👉 Default -->
:::::card Default

Default variant for avatar is `light`.

Use `color` prop to change the avatar color.

:::code DemoAvatarDefault
<<< @/components/demos/avatar/DemoAvatarDefault.vue
:::

::::after-demo

:::details Using with `AMenu` component
If you use `AMenu` component along with `AAvatar` then you will use default slot of `AAvatar` component to show menu. Hence, some of the props will get discarded in favor of default slot usage.

You can refer to list of discarded props when default slot is used in API section.
:::

::::

:::::

<!-- 👉 Fill -->
::::card Fill

You can use `variant="fill"` to create avatar with filled background.

:::code DemoAvatarFill
<<< @/components/demos/avatar/DemoAvatarFill.vue{4,9,15}

::::

<!-- 👉 Outlined -->
::::card Outlined

You can use `variant="outline"` to create outlined avatar.

:::code DemoAvatarOutlined
<<< @/components/demos/avatar/DemoAvatarOutlined.vue{4,9,15}
:::

::::

<!-- 👉 Sizing -->
::::card Sizing

You can use font-size utility to adjust the size of avatar.

:::code DemoAvatarSizing
<<< @/components/demos/avatar/DemoAvatarSizing.vue{5,9,13,17,21}
:::

::::

<!-- 👉 Roundness -->
::::card Roundness

You can adjust avatar roundness using border-radius utilities.

:::code DemoAvatarRoundness
<<< @/components/demos/avatar/DemoAvatarRoundness.vue{5,9,13,17,21}
:::

::::

<!-- 👉 API -->
## API

<Api title="Avatar" :api="api"></Api>
