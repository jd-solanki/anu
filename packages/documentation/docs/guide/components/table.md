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

<!-- 👉 Column Slot -->
<Demo>

## Column Slot

`ATable` generates scoped slot based on your column name. If your column name is `website` then you can use `row-website` scoped slot to render custom content in your column.

<template #demo>
    <div class="cards-demo-container">
        <DemoTableColumnSlot />
    </div>
</template>

<template #code>

<<< @/demos/table/DemoTableColumnSlot.vue

</template>

</Demo>

<!-- 👉 Filtering -->
<Demo>

## Filtering

Set `search` prop to `true` to enable table filtering.

Search will respect the column's `isFilterable` property to include or exclude the column from searching. If you don't specify column defination all columns will be filterable.

<template #demo>
    <div class="cards-demo-container">
        <DemoTableFiltering />
    </div>
</template>

<template #code>

<<< @/demos/table/DemoTableFiltering.vue

</template>

</Demo>

<!-- 👉 Sorting -->
<Demo>

## Sorting

Sorting is enable by default and will respect the column's `isSortable` property. If you don't specify column definition all columns will be sortable.

To disable sorting on table use set `isSortable` prop to `false` on `ATable`.

Moreover, You can also sort multiple columns at once. You can enable it by setting `multiSort` prop to `true` on `ATable`.

<template #demo>
    <div class="cards-demo-container">
        <DemoTableSorting />
    </div>
</template>

<template #code>

<<< @/demos/table/DemoTableSorting.vue

</template>

</Demo>

<!-- 👉 Extra Column -->
<Demo>

## Extra Column

Define extra column in column definition to add column to table. Later, you can use column slot `row-<name>` to render your custom content.

Moreover, you can also omit the column definition to omit rendering the specific column.

<template #demo>
    <div class="cards-demo-container">
        <DemoTableExtraColumn />
    </div>
</template>

<template #code>

<<< @/demos/table/DemoTableExtraColumn.vue

</template>

</Demo>

<!-- 👉 Server Side Table -->
<Demo>

## Server Side Table

If your table data is coming from API/backend you can pass async function to `rows` prop which should resolve the below type:

```ts
interface rowsFunctionReturn {
  rows: unknown[]
  total: number
}
```

```ts{6}
const fetchRows = ({ q, currentPage, rowsPerPage, sortedCols }) => {
  // You can use => q, currentPage, rowsPerPage, sortedCols
  return new Promise((resolve, reject) => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => resolve(json))

      // resolve(json) => { rows: [...], total: 10 }
  })
}
```

<template #demo>
    <div class="cards-demo-container">
        <DemoTableServerSideTable />
    </div>
</template>

<template #code>

<<< @/demos/table/DemoTableServerSideTable.vue

</template>

</Demo>
