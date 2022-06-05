# Base Input

Stay tuned...


## Outer Slots

Default slot

<ABaseInput class="w-64">
<template #default="props">
<input type="text" v-bind="props" />
</template>
</ABaseInput>

Prepend slot

<ABaseInput class="w-64">
<template #prepend>
<i class="i-bx-info-circle"></i>
</template>
<template #default="props">
<input type="text" v-bind="props" />
</template>
</ABaseInput>

Append slot

<ABaseInput class="w-64">
<template #default="props">
<input type="text" v-bind="props" />
</template>
<template #append>
<i class="i-bx-info-circle"></i>
</template>
</ABaseInput>

Prepend & Append slot

<ABaseInput class="w-64">
<template #prepend>
<i class="i-bx-info-circle"></i>
</template>
<template #default="props">
<input type="text" v-bind="props" />
</template>
<template #append>
<i class="i-bx-info-circle"></i>
</template>
</ABaseInput>


## Inner slots

Prepend inner slot

<ABaseInput class="w-64">
<template #prepend-inner>
<i class="i-bx-dollar"></i>
</template>
<template #default="props">
<input type="text" v-bind="props" />
</template>
</ABaseInput>

Append inner slot

<ABaseInput class="w-64">
<template #default="props">
<input type="text" v-bind="props" />
</template>
<template #append-inner>
<i class="i-bx-dollar"></i>
</template>
</ABaseInput>

Prepend & Append inner slot

<ABaseInput class="w-64">
<template #prepend-inner>
<i class="i-bx-dollar"></i>
</template>
<template #default="props">
<input type="text" v-bind="props" />
</template>
<template #append-inner>
<i class="i-bx-dollar"></i>
</template>
</ABaseInput>

## Hint, Error & Bottom slot

Hint

<ABaseInput class="w-64" hint="We never share your email with anyone">
<template #prepend-inner>
<i class="i-bx-at"></i>
</template>
<template #default="props">
<input type="text" v-bind="props" />
</template>
</ABaseInput>

Bottom slot


<ABaseInput class="w-64">
<template #default="props">
<input type="text" v-bind="props" />
</template>
<template #bottom>
<small class="inline-block w-full text-right">right aligned text</small>
</template>
</ABaseInput>

Error

<ABaseInput class="w-64" error="This field is required">
<template #prepend-inner>
<i class="i-bx-at"></i>
</template>
<template #default="props">
<input type="text" v-bind="props" />
</template>
</ABaseInput>

## Input Types

Text

<ABaseInput class="w-64">
<template #default="props">
<input type="text" v-bind="props" />
</template>
</ABaseInput>

Password

<ABaseInput class="w-64">
<template #default="props">
<input type="password" v-bind="props" />
</template>
</ABaseInput>

Search

<ABaseInput class="w-64">
<template #default="props">
<input type="search" v-bind="props" />
</template>
</ABaseInput>

url

<ABaseInput class="w-64">
<template #default="props">
<input type="url" v-bind="props" />
</template>
</ABaseInput>

number

<ABaseInput class="w-64">
<template #default="props">
<input type="number" v-bind="props" />
</template>
</ABaseInput>

Date

<ABaseInput class="w-64">
<template #default="props">
<input type="date" v-bind="props" />
</template>
</ABaseInput>

time

<ABaseInput class="w-64">
<template #default="props">
<input type="time" v-bind="props" />
</template>
</ABaseInput>

file

<ABaseInput class="px-0" input-wrapper-classes="!px-0">
<template #default="props">
<input type="file" v-bind="props" class="file:rounded-lg file:border-none file:mr-4 file:px-4 file:py-3 file:text-gray-500 file:rounded-r-none file:bg-gray-100" />
</template>
</ABaseInput>
