# Dynamic Props

Inspired from [Vuetify](https://vuetifyjs.com/), anu provides a way to configure the component props dynamically.

## Why Dynamic Props?

When you use a component from component libraries, that component has props defaults assigned to it according to common needs. For example, `color` prop is always set to `primary` because it is the most common color used in the application.

However, what about not so obvious props like `size` prop. Your design system might requires smaller components than provided by the component library. In that case you have to write `size` prop everywhere.

```vue
<template>
  <ABtn size="sm">Submit</ABtn>

  <ABtn size="sm">Preview</ABtn>

  <ABtn size="sm">Download</ABtn>
</template>
```

You have to repeat `size` prop everywhere which is super inconvenient <i class="i-fluent-emoji-confounded-face"></i> and has few downsides as well (_we aren't going to discuss them here_).

## The Solution?

But what if we have a way to configure the props defaults for all the components provided by component libraries? That would be super convenient <i class="i-fluent-emoji-grinning-face"></i> and we don't have to repeat the same props everywhere.

With anu, you can configure the props defaults for all the components while registering the plugin.

```ts{4-8}
// ℹ️ Anu don't have `size` prop. This is just an example.
createApp(App)
  .use(anu, {
    propsDefaults: {
      ABtn: {
        size: 'sm',
      },
    }
  })
```

Now, You can write your components without repeating the `size` prop and keep your code DRY.

```vue
<template>
  <ABtn>Submit</ABtn>

  <ABtn>Preview</ABtn>

  <ABtn>Download</ABtn>
</template>
```

Using `propsDefaults` you can set props defaults for any Anu component.

## Nested Props Defaults

Life is not always simple and your client might need visually different component based on context. For example, you might need a text variant button inside alert and normal (fill variant) button elsewhere. Then we are back to square one. We have to repeat the `variant` prop in every alert <i class="i-fluent-emoji-expressionless-face"></i>

```vue
<template>
  <AAlert>
    <p>You're running out of storage!</p>
    <ABtn variant="text" class="ms-auto">Upgrade</ABtn> // [!code hl]
  </AAlert>

  <AAlert>
    <p>Critical error occurred!</p>
    <ABtn variant="text" class="ms-auto">Check</ABtn> // [!code hl]
  </AAlert>

  <AAlert>
    <p>Payment failed!</p>
    <ABtn variant="text" class="ms-auto">Retry</ABtn> // [!code hl]
  </AAlert>
</template>
```

Anu also provides support for nested props defaults. You can set props defaults for a component inside another component.

```ts{4-8}
createApp(App)
  .use(anu, {
    propsDefaults: {
      AAlert: {
        ABtn: {
          variant: 'text',
        },
      },
    }
  })
```

Now, with new props defaults, you can write your components without repeating the `variant` prop and keep your code DRY.

```vue
<template>
  <AAlert>
    <p>You're running out of storage!</p>
    <ABtn class="ms-auto">Upgrade</ABtn> // [!code hl]
  </AAlert>

  <AAlert>
    <p>Critical error occurred!</p>
    <ABtn class="ms-auto">Check</ABtn> // [!code hl]
  </AAlert>

  <AAlert>
    <p>Payment failed!</p>
    <ABtn class="ms-auto">Retry</ABtn> // [!code hl]
  </AAlert>
</template>
```

Cool right? <i class="i-fluent-emoji-smiling-face-with-sunglasses"></i>

Hold on, there is more. We're still repeating the `class` attribute. <i class="i-fluent-emoji-expressionless-face"></i>

![Breaks Keyboard GIF](https://media.tenor.com/Tp6pUkz1oR8AAAAC/breaks-keyboard.gif)

## Class, Style & Attrs Defaults

Apart from props, Anu also supports setting defaults for `class`, `style` and `attrs` for all the components.

```ts
createApp(App)
  .use(anu, {
    propsDefaults: {
      AAlert: {
        ABtn: {
          variant: 'text',
          class: 'ms-auto', // [!code hl]
          // style: {}, /* You can also set default styles */ // [!code hl]
          // attrs: {}, /* Set default attrs, Just in case if needed */ // [!code hl]
        },
      },
    },
  })
```

Finally, we have a way to write our components without repeating the code and keep our code DRY.

```vue
<template>
  <!-- All buttons will have "ms-auto" class "light" variant -->
  <AAlert>
    <p>You're running out of storage!</p>
    <ABtn>Upgrade</ABtn> // [!code hl]
  </AAlert>

  <AAlert>
    <p>Critical error occurred!</p>
    <ABtn>Check</ABtn> // [!code hl]
  </AAlert>

  <AAlert>
    <p>Payment failed!</p>
    <ABtn>Retry</ABtn> // [!code hl]
  </AAlert>
</template>
```

## Defaults for your component

You can also set defaults for your own components. For example, you can set defaults for your custom `AppBtn` component.

```ts{4-11}
createApp(App)
  .use(anu, {
    propsDefaults: {
      AppBtn: {
        class: 'uppercase',
      },
      AppAAlert: {
        AppBtn: {
          propName: false,
        },
      }
    },
  })
```

Later in your component use `useDefaults` composable:

```vue
<script lang="ts" setup>
// other imports
import { useDefaults } from 'anu-vue'

// ❗ Make sure to use `_props` as name
const _props = defineProps<{}>() // or `withDefaults`

const { props, defaultsClass, defaultsStyle, defaultsAttrs } = useDefaults(_props)

// other code
</script>

<template>
  <div
    class="my-class"
    :class="defaultsClass"
    :style="[
      { color: 'red' },
      defaultsStyle,
    ]"
    v-bind="defaultsAttrs"
  >
    <!-- Your component content -->
    <!-- ❗ If you want to access props use `props.propName` -->
  </div>
</template>
```

Whoa! Anu also added DX magic to your custom components <i class="i-fluent-emoji-man-mage-light"></i>

:::warning
When you use `useDefaults` composable, you have to use `props.propName` while accessing the props to get props configured by defaults.

Even in your template, use `props.propName` to access the props.
:::
