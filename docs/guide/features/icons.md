# Icons

Using icons from another library is just single line away <i class="i-fluent-emoji-face-with-open-mouth"></i>

As Anu uses UnoCSS, You can use UnoCSS's [Icons preset](https://unocss.dev/presets/icons) to use icons from any supported library.

- Box Icons <i class="i-bx-home"></i> <i class="i-bx-crown"></i> <i class="i-bx-fingerprint"></i>
- Fluent Emoji <i class="i-fluent-emoji-dollar-banknote"></i> <i class="i-fluent-emoji-face-with-tears-of-joy"></i> <i class="i-fluent-emoji-anxious-face-with-sweat"></i>
- Logos <i class="i-logos-vue"></i> <i class="i-logos-unocss"></i> <i class="i-logos-vueuse"></i>

<p class="p-1px"></p>

[Preview](https://icones.js.org/) all available icons.

<p class="p-1px"></p>

Anu uses Box Icons by default.

## Installation

You've already installed UnoCSS & Icons preset by following installation guide.

If you want to use another library, please refer to the [official docs](https://unocss.dev/presets/icons#install) on the UnoCSS.

## Usage

Once installed you can use icons in your templates like this:

```html
<!-- <div class="i-<collection-name>-<icon-name>" /> -->

<div class="i-logos-vue" />

<ABtn
  icon="i-logos-vue" // [!code hl]
  variant="outline"
  color="#42b883"
>
  Vue
</ABtn>
```
