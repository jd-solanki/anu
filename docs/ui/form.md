# Form

<!-- 👉 Credit card -->
<!-- Check why we can't apply * to label via configurable prop => Add * in this UI & add tip in docs how to do it -->
:::::card Credit card {bordered}

<br>

::::code UIFormCreditCardPayment
<<< @/components/ui/form/UIFormCreditCardPayment.vue
::::

::::after-demo
:::tip
We are not using `.a-card-spacer` class here because we get spacing between card body via Anu's grid system 😇
:::
::::

:::::

<!-- 👉 Form Validation using Zod -->
::::card Form Validation using Zod {bordered}

<br>

:::code UIFormValidationZod
<<< @/components/ui/form/UIFormValidationZod.vue
:::

::::

<!-- 👉 Copy Secrets -->
::::card Copy Secrets {bordered}

<br>

:::code UIFormCopySecrets
<<< @/components/ui/form/UIFormCopySecrets.vue
:::

::::
