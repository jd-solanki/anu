# FAQ

## 🎨 Using CSS Variables vs Theme for customization

If you have checked [customization](/guide/getting-started/customization.md) section & [theme](/guide/features/theme.md) section you might have noticed that there are two ways to customize the look & feel of the component. You might get confused that which one to use.

Here's thumb rule:

1. Use theme if you want theme based customization. For example, you want to change the color of the component based on the theme (light/dark/others). => ***Use theme***
2. Use CSS variable if you want to customize the component regardless of theme. For example, you want to customize the list component spacing. => ***Use CSS variables***

## How to change fonts in Anu?

You can use "Web Fonts preset" from UnoCSS to change the fonts. Please refer to the [Web Fonts preset](https://unocss.dev/presets/web-fonts) for more details. Lastly, You have to update font-family:

```scss
body {
  font-family: 'Roboto', sans-serif;
}
```

:::info
We will try to improve this from UnoCSS side so you don't have to write additional CSS.
:::
