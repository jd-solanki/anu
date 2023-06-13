# Contribution Guide

> _This project's workflow is similar to [antfu](https://github.com/antfu)'s projects' workflow so this contribution guide might look a bit similar to [his](https://github.com/antfu/contribute/commits?author=antfu)._

<!-- Just adds some space -->
<div class="pt-1"></div>

:::tip
You can checkout volunteer tasks in [GitHub Projects](https://github.com/users/jd-solanki/projects/2?query=is%3Aopen+sort%3Aupdated-desc) if you don't know where to start.
:::

:::card 🏗 Repository Setup

I use `pnpm` for my OpenSource projects. I also use [yarn](https://classic.yarnpkg.com/) & npm as well, just like you. So, I highly recommend using [ni](https://github.com/antfu/ni).

We will use ni's commands in the following code snippets. If you are not using it, you can do the conversion yourself: `ni = pnpm install`, `nr = pnpm run`.

To set the repository up:

|Step|Command|
|-|-|
|1. Install [Node.js](https://nodejs.org/), using the latest [LTS](https://nodejs.org/en/about/releases/)|-|
|2. Install [@antfu/ni](https://github.com/antfu/ni)| `npm i -g @antfu/ni` |

:::

:::card 🎮 Commands

`nr dev`

It will start development mode for Anu package. It will start the build process in watch mode.

`nr docs:dev`

It will start VitePress development server for documentation. Within few seconds you will get the link to run documentation. You can use this as playground.

`nr clean`

It will remove the node_modules directory from workspace root and all the packages.
:::

:::card 🧑🏻‍💻 Editor Setup

[VS Code](https://code.visualstudio.com/) is recommended editor for this project. There's nice configurations in `.vscode` along with other editor related config files which will setup your editor according to project.

### Recommended Extensions

Install & enable recommended extensions by following [this](https://code.visualstudio.com/docs/editor/extension-marketplace#_recommended-extensions) guide.

### Comment Anchors

I heavily use [comment anchors](https://marketplace.visualstudio.com/items?itemName=ExodiusStudios.comment-anchors) extension in all of my projects for quick navigation within file.

I highly recommend reading the [README](https://github.com/StarlaneStudios/vscode-comment-anchors/blob/master/README.md) of this extension to get the idea of how to use it. This is great time saver and will take 2-3 minute reading.

#### Anchors

Below is list of anchors we can use in this project. You can get list of snippet for anchors by pressing `ctrl`+`space` and searching for `cm-`.

##### 👉  _(cm-hand-emoji)_

I use this emoji to anchor a line. This is for highlighting some code block or navigating to regularly visited line.

**I use this for dividing my file in small chunks and labeling code blocks.**

##### ℹ️ _(cm-info-emoji)_

I use this emoji to remind/inform other contributors or myself about some specific code I have written so I don't get question like "Why the hack, I wrote this code?" later on.

**I use it to comment intermediate or complex code.**

##### ❗ _(cm-warning-emoji)_

I use this emoji to warn other contributors or myself about some danger. I rarely use it. It is useful in letting others know to be careful here.

**I use it to indicate be very careful with whatever you do with code next to it**

### No Prettier

Since ESLint is already configured to format the code, there is no need to duplicate the functionality with Prettier. To format the code, you can run `na eslint --fix` or referring the [ESLint section](https://github.com/antfu/contribute#eslint) for IDE Setup.

If you have Prettier installed in your editor, we recommend you disable it when working on the project to avoid conflict.

:::

::::card ⌨️ Writing code

:::tip
Anu uses [`@antfu/utils`](https://github.com/antfu/utils) for utilities. You can use it to avoid reinventing the wheel.
:::

### Required

- Anu provides preset named "Theme Default" where all appearance related classes should be written. Idea is someone can create his own preset to totally customize the look & feel of Anu.
- For structural & functional styles, you better write them in component itself.
- If you are creating new component please make sure to follow the pattern we used in other components. Additionally, Make sure to use `as const` for slots like below:

```ts{3}
export const aTabsSlots = {
  default: (_: { name: any }) => null as any,
} as const
```

### Optional

- For dummy text instead of Lorem ipsum, you can use [cupcakeipsum](http://www.cupcakeipsum.com/) which is pretty sweet 😋
- Try to follow [Python Zen](https://peps.python.org/pep-0020/). [Here](https://betterprogramming.pub/contemplating-the-zen-of-python-186722b833e5)'s post with nice examples.

### Design

At the moment, anu don't have any design system. Hence, we have full freedom to design the component we like. However anu's UI should follow some basic stuff:

- It should be minimal
- Alignment matters
- Prefer outline icons instead of solid icons
- transitions & animations are nice to have (_Don't use fancy animations, it should look professional_)

:::details Design inspirations

<!-- - [UntitledUI](https://www.figma.com/file/V8nKLCJemHJyuAN39W6iok/%E2%9D%96-PREVIEW-%E2%9D%96-Untitled-UI-%E2%80%93-PRO-(v3.1)) -->

- [Anu](https://dribbble.com/jd_0001/collections/5754387-anu) dribble collection
- [Stratis UI](https://www.stratisui.com/)
- [UntitledUI](https://www.figma.com/community/file/1020079203222518115)
- [Daisy UI](https://www.figma.com/file/usqAh1FfAVsiGIbSKUKyQ7/Disy-%E2%80%94-Preview-1.1?node-id=654%3A4605)
- [One UI](https://www.behance.net/gallery/140873105/Oneui-Minimalism-UI-kit)
- [Tremor](https://www.tremor.so/)
- [Preline UI](https://preline.co/)
- [Popups & Modals](https://www.figma.com/community/file/1160004185821594377)
- Search [dribbble](https://dribbble.com/)
:::

### CSS vars

We follow naming convention for CSS color vars. As we have theme colors CSS vars that has just HSL value and not full color (e.g. `--a-primary: 265, 97.7%, 66.3%`) and some other colors that are full color (e.g. `--a-switch-icon-color: hsla(0, 10%, 20%, 0.68)`), it's confusing while using the CSS var to identify if it's full color or just HSL value.

Due to this reason we follow below convention when deciding the name of CSS var that is color:

- suffix `-c` => For just HSL value (`--a-base-c: 0, 10%, 20%;`)
- suffix `-color` => For full color (`--a-switch-icon-color: hsla(0, 10%, 20%, 0.68)`)
- Don't suffix anything => For theme color (`--a-primary: 265, 97.7%, 66.3%`)

With above naming convention, we can clearly know if we should wrap the CSS var in `hsl()` or directly use it like a color value.

:::warning
Don't forget to follow this convention when defining any CSS var for color, including background (`--a-something-bg-color: hsl(var(--a-surface-c))`)
:::

### [Template Refs](https://vuejs.org/guide/essentials/template-refs.html)

In Anu, we follow below convention for template refs:

- variable that holds template ref should be prefixed with `ref`. e.g. `refInput`, `refMenu`, etc.
- Try to assign type for template ref variable. e.g. `refWrapper: Ref<HTMLDivElement | undefined> = ref()`

### Creating new component

First of all, it is advisable to discuss the design & features of the component by opening the new [issue](https://github.com/jd-solanki/anu/issues/new). E.g. [New component: Menu](https://github.com/jd-solanki/anu/issues/26)

For creating new component,

1. Create new folder with the name of the component in `packages/anu-vue/src/components`
2. Create component with `.vue` extension (we'll only use `.ts` or `.tsx` in special cases)
3. Create `meta.ts` file and define props, slots & events for the component.
4. Create `index.ts` file like other components and export stuff like meta, component, etc. (You can check other component's `index.ts` file and update accordingly.)
5. Export newly created component in `packages/anu-vue/src/components/index.ts` file so it can be registered globally

Once you have this setup, create docs page for this component in `packages/documentation/docs/guide/components`

Add the newly created docs page to the sidebar of the docs in [`packages/documentation/docs/.vitepress/config.ts`](https://github.com/jd-solanki/anu/blob/337eeb676d52646ffeedc57daa540d7e7168a17a/packages/documentation/docs/.vitepress/config.js#L37)

For demo you need to create a new demo file in `packages/documentation/docs/demos/<component-name>`. **Make sure to follow the naming convention** (`Demo<component-name><demo-name>`) for creating demo so that it doesn't conflict with other demo file. This is because these files will be globally registered as components in VitePress so we can use them in markdown easily.

Now, we have component, its documentation page and single demo.

For creating a demo use `card` container (You can refer to other component docs).

```md
::::card <demo-title> <!-- This is title of demo -->

:::code <demo-file> <!-- This will render the demo -->
<<< <path-to-demo-file> <!-- This will add code snippet for the demo -->
:::
```

Make sure you are add snippet of the same demo you rendered.

For better UX you can [highlight the lines](https://vitepress.vuejs.org/guide/markdown#line-highlighting-in-code-blocks) in demo snippet as we done in other components.

:::tip
If you want to insert additional content after demo is shown in the above snippet, you can use `:::after-demo` container. However, if you use this container you have to increase number of `:` (_marker_) in above snippet by 1. Please refer to this related [issue](https://github.com/vuejs/vitepress/issues/764#issuecomment-1151195457).
:::

:::details Inspirations

- [GUI challenges](https://www.youtube.com/playlist?list=PLNYkxOF6rcIAaV1wwI9540OC_3XoIzMjQ)
- [Quasar](https://quasar.dev/) & [Vuetify](https://vuetifyjs.com/) component API
:::

<br>

#### API

Make sure to write the API of the component correctly so it can be auto generated by [vue-component-meta](https://github.com/johnsoncodehk/volar/tree/master/vue-language-tools/vue-component-meta)

Please refer to its [README](https://github.com/vuejs/language-tools/blob/master/packages/vue-component-meta/README.md) for details.

:::tip
You can write markdown in prop description
:::

::::

:::card 😍 Pull request

### Discuss first

Before you start to work on a feature pull request, it's always better to open a feature request issue first to discuss with the maintainers whether the feature is desired and the design of those features. This would help save time for both the maintainers and the contributors and help features to be shipped faster.

For typo fixes, it's recommended to batch multiple typo fixes into one pull request to maintain a cleaner commit history.

### Commit convention

We use [Conventional Commits](https://www.conventionalcommits.org/) for commit messages, which allows the changelog to be auto-generated based on the commits. Please read the guide through if you aren't familiar with it already.

Only `fix:` and `feat:` will be presented in the changelog.

Note that `fix:` and `feat:` are for actual code changes (that might affect logic). For typo or document changes, use `docs:` or `chore:` instead:

- ~~`fix: typo`~~ -> `docs: fix typo`

### Pull Request

If you don't know how to send a Pull Request, we recommend reading [the guide](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request).

When sending a pull request, make sure your PR's title also follows the [Commit Convention](https://github.com/antfu/contribute#commit-conventions).

If your PR fixes or resolves an existing issue, please add the following line in your PR description (replace `123` with a real issue number):

```
fix #123
```

This will let GitHub know the issues are linked, and automatically close them once the PR gets merged. Learn more at [the guide](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword).

It's ok to have multiple commits in a single PR, you don't need to rebase or force push for your changes as we will use `Squash and Merge` to squash the commits into one commit when merging.

Thanks for reading and your contribution 😇

Happy coding 🙌🏻

:::

:::card 🦸 Heros

<a href="https://github.com/jd-solanki/anu/graphs/contributors"><img src="https://contrib.rocks/image?repo=jd-solanki/anu" /></a>

:::
