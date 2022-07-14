<script setup lang="ts">
import { useCssVar } from '@vueuse/core'
import { computed, onMounted } from 'vue';

const primaryColor = useCssVar('--a-primary')
const vpBrandHue = useCssVar('--vp-brand-hue')
const isPrimaryChanged = computed(() => !primaryColor.value.startsWith('265'))

const updatePrimaryColor = () => {
    // To update the look & feel of whole template, update VitePress primary color as well
    vpBrandHue.value = isPrimaryChanged.value ? '265' : '235'

    primaryColor.value = `${isPrimaryChanged.value ? '265' : '235'}, 97.7%, 66.3%`
}
</script>

# Customization

## Color

Anu uses [HSL](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hsl) color format to define colors. You can configure theme colors via [CSS variables(custom properties)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties).

To customize theme color, set CSS variable in your CSS with color name prefixed with `--a-` (_e.g. `--a-primary`_). Below is list of colors you can configure.

<div class="flex all-me-6">
    <ACard variant="fill" color="primary" class="rounded-2xl shadow-2xl shadow-primary shadow-opacity-40 w-26 h-26 font-semibold grid place-items-center">Primary</ACard>
    <ACard variant="fill" color="success" class="rounded-2xl shadow-2xl shadow-success shadow-opacity-40 w-26 h-26 font-semibold grid place-items-center">Success</ACard>
    <ACard variant="fill" color="info" class="rounded-2xl shadow-2xl shadow-info shadow-opacity-40 w-26 h-26 font-semibold grid place-items-center">Info</ACard>
    <ACard variant="fill" color="warning" class="rounded-2xl shadow-2xl shadow-warning shadow-opacity-40 w-26 h-26 font-semibold grid place-items-center">Warning</ACard>
    <ACard variant="fill" color="danger" class="rounded-2xl shadow-2xl shadow-danger shadow-opacity-40 w-26 h-26 font-semibold grid place-items-center">Danger</ACard>
</div>

<ABtn class="mt-8" :class="isPrimaryChanged ? 'bg-[hsl(265,97.7%,66.3%)]' : 'bg-[hsl(235,97.7%,66.3%)]'" @click="updatePrimaryColor">{{ isPrimaryChanged ? 'Reset' : 'Change' }} primary</ABtn>

## CSS variables

Besides colors, Anu uses CSS variables for other stuff like app background, typography customization, etc. Interesting ones are listed below:

| CSS variables                      | Usage                        |
| :--------------------------------- | :--------------------------- |
| `--a-background`                   | App background               |
| `--a-text-emphasis-high-opacity`   | High priority text opacity   |
| `--a-text-emphasis-medium-opacity` | Medium priority text opacity |
| `--a-text-emphasis-light-opacity`  | Low priority text opacity    |

## Component customization

_In future releases_

:::info
My main focus at the moment is to release this lib and checking its response. If I get enough stars on GitHub, I will devote more time to this lib.

<a class="!hover:opacity-100 !no-underline" href="https://github.com/jd-solanki/anu" rel="noopener noreferrer" target="_blank">
    <ABtn class="text-sm my-2" icon="i-bx-star" variant="light" href="https://github.com/jd-solanki/anu" tag="a">
        Give a star
    </ABtn>
</a>
:::
