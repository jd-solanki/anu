# Contribution Guide

> _This project's workflow is similar to [antfu](https://github.com/antfu)'s projects' workflow so this contribution guide might look a bit similar to [his](https://github.com/antfu/contribute/commits?author=antfu)._

## 🏗 Repository Setup

I use `pnpm` for my OpenSource projects. I also use [yarn](https://classic.yarnpkg.com/) & npm as well, just like you. So, I highly recommend using [ni](https://github.com/antfu/ni).

We will use ni's commands in the following code snippets. If you are not using it, you can do the conversion yourself: `ni = pnpm install`, `nr = pnpm run`.

To set the repository up:

|Step|Command|
|-|-|
|1. Install [Node.js](https://nodejs.org/), using the latest [LTS](https://nodejs.org/en/about/releases/)|-|
|2. Install [@antfu/ni](https://github.com/antfu/ni)| `npm i -g @antfu/ni` |

## 🎮 Commands

`nr dev`

It will start development mode for Anu package. It will start the build process in watch mode.

`nr docs:dev`

It will start VitePress development server for documentation. Within few seconds you will get the link to run documentation. You can use this as playground.

`nr clean`

It will remove the node_modules directory from workspace root and all the packages.

## 🧑🏻‍💻 Editor Setup

VS Code is recommended editor for this project. There's nice configurations in `.vscode` along with other editor related config files which will setup your editor according to project.

### Recommended Extensions

Install & enable recommended extensions by following [this](https://code.visualstudio.com/docs/editor/extension-marketplace#_recommended-extensions) guide.

### Comment Anchors

I heavily use [comment anchors](https://marketplace.visualstudio.com/items?itemName=ExodiusStudios.comment-anchors) extension in all of my projects for quick navigation within file.

I highly recommend reading the README of this extension to get the idea of how to use it. This is great time saver and will take 2-3 minute reading.

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

## 😍 Pull request

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

```plaintext
fix #123
```

This will let GitHub know the issues are linked, and automatically close them once the PR gets merged. Learn more at [the guide](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword).

It's ok to have multiple commits in a single PR, you don't need to rebase or force push for your changes as we will use `Squash and Merge` to squash the commits into one commit when merging.

Thanks for reading and your contribution 😇

Happy coding 🙌🏻
