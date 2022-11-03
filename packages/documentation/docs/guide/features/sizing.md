# Sizing

## Scaling

When adjusting the size of the component, you want to reduce component's overall look including padding, height, width, etc along with font size.

Anu mostly uses `em` unit for applying padding, height, width, etc. You can leverage this to create custom size we want just using font size utilities.

<ABtn class="text-sm" variant="outline">Button</ABtn>

```vue{3}
<template
  <ABtn
    class="text-sm"
    variant="outline"
  >
    Button
  </ABtn>
</template>
```

## Spacing

Just like plain CSS or UnoCSS, Anu also provides flexibility with component sizing. You are not limited to sizes like `sm`, `lg` & `xl`, with Anu you can create arbitrary sizes using `spacing` prop & font size combination.

Assume you want to create a small button but **don't want to reduce it's font size** according to your design. In other frameworks you have to manually adjust the padding, height, width, etc to achieve this.

<ABtn :spacing="80" variant="outline">Button</ABtn>

```vue{3}
<template
  <ABtn
    :spacing="80"
    variant="outline"
  >
    spacing-80
  </ABtn>
</template>
```

:::tip Predefined Sizes
You can create your own predefined sizes like `size` prop in other frameworks using custom class & shortcuts.

```vue
<template>
  <ABtn class="size-xl">Button</ABtn>
</template>
```

Now, create a new shortcut for this `'btn': '[&.size-xl]-p-8',`. You can also take it further with dynamic shortcuts and other UnoCSS features.
:::
