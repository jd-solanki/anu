# Scrollbar hack

## The Problem

I have added scroll lock to body/html when dialog is opened according to best of my knowledge.

However, this comes with a cost. If you have element with position fixed/sticky _(most probably navbar)_ then you might have noticed that it gives small blank space _(it's and absence of scrollbar)_ on right when dialog _(all components that locks body scroll)_ is opened.

### Reproducing issue

I use VitePress for docs and I also faced this issue with navbar. I already fixed this with custom style but to demonstrate what was the issue please follow below steps:

1. Inspect the navbar and focus on `.VPNav`
2. Open any [dialog](/guide/components/dialog)
3. Remove below style applied to `.VPNav`

   ```css
   min-width: calc(100% + 15px);
    ```

Now you will be able to see small gap on right of navbar.

## The hack

Now from here we have two approaches:

### 1. Adding class

> _This hack assumes you have control over markup._

First of all add below styles to your app:

```scss
html[style~="hidden;"] {  
  .extender-container {
    // You might not need below line
    min-width: calc(100% - var(--scrollbar-width));

    .extender-content {
      &::after {
        content: '';
        display: block;
        height: 100%;
        width: var(--scrollbar-width);
      }
    }
  }
}
```

Now, add `extender-container` class to container that has this issue. In VitePress, it's `.VPNav`. Add `extender-content` class to the wrapper that contains actual content _(we will add `::after` to content wrapper so that `::after` acts as content)_. In VitePress, it's `.VPNav > .VPNavBar > .container > .content`. With class add it should look like below in VitePress:

```html
<header class="VPNav extender-container">
    <!-- Other DOM elements -->
    
    <div class="content extender-content"></div>
</header>
```

Whenever you have this issue on another elements just add mentioned two classes in markup and styles will handle the rest 🤯

_(Unfortunetly I don't have access to VitePress navbar classes so I will use next approach)_

### 2. Targeting selector

With this approach, instead of adding classes we will target the selector. As you know I need to apply style to `.VPNav` and `.content` inside it.

Hence, my style should be:

```scss
html[style~="hidden;"] {
  .VPNav {
    // You might not need below line
    min-width: calc(100% - var(--scrollbar-width));

    > .VPNavBar > .container > .content {
      &::after {
        content: '';
        display: block;
        height: 100%;
        width: var(--scrollbar-width);
      }
    }
  }
}
```

You can find exact same style in docs 😊

---

Let me know if this hack helped you by a tweet [@me_jd_solanki](https://twitter.com/me_jd_solanki)
