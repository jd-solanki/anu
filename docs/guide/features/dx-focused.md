<script lang="ts" setup>
const items = [
  {
    title: 'Electronics',
    avatarProps: { icon: 'i-bx-mobile-alt' },
  },
  {
    title: 'Fashion',
    avatarProps: { icon: 'i-bx-closet' },
  },
  {
    title: 'Decor',
    avatarProps: { icon: 'i-bx-home' },
  },
  {
    title: 'Sports',
    avatarProps: { icon: 'i-bx-football' },
  },
]
</script>

# DX Focused

> _DX => Developer Experience_

Frameworks are nice, they help you write more maintainable and less code. In the long run, developer experience does matter.

:::card Configurable Array

Assume you have a list as shown below and you want to just change the size of the avatar/icon in the list.

<div class="cards-demo-container">
  <ACard>
    <AList
      :items="items"
      icon-append
      class="[--a-list-item-gap:1rem]"
    />
  </ACard>
</div>

<br>

**With other frameworks you certainly have to repeat the markup:**

```vue{24-31}
<script lang="ts" setup>
const items = [
  {
    title: 'Electronics',
    avatarProps: { icon: 'i-bx-mobile-alt' },
  },
  {
    title: 'Fashion',
    avatarProps: { icon: 'i-bx-closet' },
  },
  {
    title: 'Decor',
    avatarProps: { icon: 'i-bx-home' },
  },
  {
    title: 'Sports',
    avatarProps: { icon: 'i-bx-football' },
  },
]
</script>

<template>
  <List>
    <ListItem v-for="item in items" :key="item.title">
        <Avatar
          icon="item.avatarProps.icon"
          size="small"
        >
        </Avatar>
        <ListItemTitle>{{ item.title }}</ListItemTitle>
    </ListItem>
  </List>
</template>
```

**With Anu it is so simple <i class="i-fluent-emoji-smiling-face-with-sunglasses"></i>**

```diff
- icon: 'i-bx-football'
+ icon: ['i-bx-mobile-alt', 'text-2xl']
```

<br>

```vue{5,9,13,17}
<script lang="ts" setup>
const items = [
  {
    title: 'Electronics',
    avatarProps: { icon: ['i-bx-mobile-alt', 'size-2xl'] },
  },
  {
    title: 'Fashion',
    avatarProps: { icon: ['i-bx-closet', 'size-2xl'] },
  },
  {
    title: 'Decor',
    avatarProps: { icon: ['i-bx-home', 'size-2xl'] },
  },
  {
    title: 'Sports',
    avatarProps: { icon: ['i-bx-football', 'size-2xl'] },
  },
]
</script>

<template>
  <div class="cards-demo-container">
    <ACard>
        <AList
          :items="items"
          icon-append
          class="[--a-list-item-gap:1rem]"
        />
    </ACard>
  </div>
</template>
```

:::

:::card Atomic

With Anu's atomic behavior, you can pass the existing props like `title`, `subtitle`, etc to certain components creating UI quickly without extra hassle.

The code below will create a drawer with title & subtitle. This is because `ADrawer` uses `ACard` component that in turns uses `ATypography` component.

```vue
<template>
  <ADialog
    v-model="isDialogShown"
    title="Dialog title"
    subtitle="Chocolate cake tiramisu donut"
  />
</template>
```

:::

:::card Easy Customization On The Fly

As Anu is built on top of utility classes, it has edge over the frameworks that uses SCSS or don't have utility classes.

Thanks to utility classes at some point if you want to change anything regarding the component once, only then can utility classes easily let you perform changes.

```vue
<template>
  <ABtn class="px-6" >
</template>
```

This customization is not limited to top level component. You can use selectors with utility classes to customize the nested component. e.g. `children-[.a-card]-rounded-3xl`

:::
