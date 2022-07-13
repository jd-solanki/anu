# Table

<!-- 👉 Basic -->
<Demo>

## Basic

Use `rows` prop to provide data to `ATable`. Defining columns for table is optional. When columns aren't specified, columns will get calculate from first row and all columns will be filterable and sortable.

<template #demo>
    <div class="cards-demo-container">
        <DemoTableBasic />
    </div>
</template>

<template #code>

<<< @/demos/table/DemoTableBasic.vue

</template>

</Demo>

<!-- 👉 Column Definition -->
<Demo>

## Column Definition

You can use `columns` prop to define columns for the table.

<template #demo>
    <div class="cards-demo-container">
        <DemoTableColumnDefinition />
    </div>
</template>

<template #code>

<<< @/demos/table/DemoTableColumnDefinition.vue

</template>

</Demo>

<!-- 👉 Column Formatter -->
<Demo>

## Column Formatter

Use `formatter` property while defining column to format the column text.

<template #demo>
    <div class="cards-demo-container">
        <DemoTableColumnFormatter />
    </div>
</template>

<template #code>

<<< @/demos/table/DemoTableColumnFormatter.vue

</template>

</Demo>

<!-- 👉 Server Side Pagination -->
<Demo>

## Server Side Pagination

description

<template #demo>
    <DemoTableServerSidePagination />
</template>

<template #code>

<<< @/demos/table/DemoTableServerSidePagination.vue

</template>

</Demo>
