# Arbitrary Sizes

::::card
Just like plain CSS or UnoCSS, Anu also provides flexibility with component sizing. You are not limited to sizes like `sm`, `lg`, `xl`, etc. With Anu you can have infinity <i class="i-fluent-emoji-infinity"></i> sizes that auto adjust the font as well.

Anu mostly uses `em` unit for applying padding, height, width, etc. You can leverage this to create custom sizes as you want by just using font size utilities.

<ABtn class="text-[0.95rem]" variant="outline">Button</ABtn>

```vue{3}
<template
  <ABtn
    class="text-[0.95rem]"
    variant="outline"
  >
    Button
  </ABtn>
</template>
```

:::info
When using arbitrary font sizes, UnoCSS doesn't add `line-height` along with `font-size` property, so if you have line height issue, do consider adding line height styles as well.
:::

:::tip Predefined Sizes
You can also create your own predefined sizes like `size` prop in other frameworks using custom classes & shortcuts.

```vue
<template>
  <ABtn class="size-xl">Button</ABtn>
</template>
```

Now you can create a new shortcut for this `'btn': '[&.size-xl]-p-8',`. You can also take it further with dynamic shortcuts and other UnoCSS features.
:::

::::
