# Component Aliases

Probably there will be case where you have to use the same component provided by the component library but with a same set of props or attributes. For example, you might use `ABtn` component for rendering icon only button with same set of props everywhere.

```vue
<template>
  <!-- We're repeating icon-only & variant="text" prop -->
  <ABtn
    icon="i-bx-cloud"
    icon-only // [!code hl]
    variant="text" // [!code hl]
  />

  <ABtn
    icon="i-bx-trash"
    icon-only // [!code hl]
    variant="text" // [!code hl]
  />

  <ABtn
    icon="i-bx-send"
    icon-only // [!code hl]
    variant="text" // [!code hl]
  />
</template>
```

In this type of cases, You can't use `propsDefaults` because you are using the same component everywhere with same set of props and might not need this component to have these same props everywhere. In this case, you can use `componentAliases` to create aliases for your components.

```ts{6-16}
// Import the component you want to set alias for
import { ABtn } from 'anu-vue'

createApp(App)
  .use(anu, {
    componentAliases: {
      // Set alias for ABtn component
      IconBtn: ABtn,
    },
    propsDefaults: {
      // Set props defaults for IconBtn component
      IconBtn: {
        iconOnly: true,
        variant: 'text',
      },
    }
  })
```

Now, you can use `IconBtn` component everywhere in your app and it will have the same set of props.

```vue
<template>
  <IconBtn icon="i-bx-cloud" />

  <IconBtn icon="i-bx-trash" />

  <IconBtn icon="i-bx-send" />
</template>
```

I guess, You're now convinced that Anu is the best way to use component libraries in Vue. So, what are you waiting for? Go ahead and try it out.

:::info
Component aliases are registered globally so you don't have to import them.
:::
