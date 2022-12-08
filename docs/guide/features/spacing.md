# Spacing

There might be cases where using component libraries introduces several restrictions. Assume you want to reduce the overall spacing of the button but don't want to reduce the font size of it. With other frameworks, you have to manually adjust the padding, margin, height, etc to get the desired result.

However, Anu provides `spacing` prop to adjust the spacing of any component that supports this feature.

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
