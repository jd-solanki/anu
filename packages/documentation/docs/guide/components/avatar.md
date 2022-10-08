<script lang="ts" setup>
import api from '@anu-vue/component-meta/AAvatar.json'
</script>

# Avatar

<!-- 👉 Default -->
::::card Default

Default variant for avatar is `light`

:::code DemoAvatarDefault
<<< @/demos/avatar/DemoAvatarDefault.vue
:::

::::

<!-- 👉 Fill -->
::::card Fill

You can use `variant="fill"` to create avatar with filled background

:::code DemoAvatarFill
<<< @/demos/avatar/DemoAvatarFill.vue

::::

<!-- 👉 Outlined -->
::::card Outlined

You can use variant="outline" to create outlined avatar

:::code DemoAvatarOutlined
<<< @/demos/avatar/DemoAvatarOutlined.vue
:::

::::

<!-- 👉 Sizing -->
::::card Sizing

You can use font-size utility to adjust the size of avatar

:::code DemoAvatarSizing
<<< @/demos/avatar/DemoAvatarSizing.vue
:::

::::

<!-- 👉 Roundness -->
::::card Roundness

You can adjust avatar roundness using border-radius utilities

:::code DemoAvatarRoundness
<<< @/demos/avatar/DemoAvatarRoundness.vue
:::

::::

<!-- 👉 API -->
## API

<Api :api="api"></Api>
