<script lang="ts" setup>
</script>

# Table

Anu provides three different variations for table component:

1. `ATable` - Use this lightweight table for simply rendering rows & columns
2. `AServeTable` - Use this table for rendering data you fetch from you server/API.
3. `ADataTable` - This table is similar to `AServerTable` but handles sorting, pagination, filtering on its own. Just pass the rows and this table will handle all of these.

<!-- 👉 Basic -->
<!-- ::::card Basic

You can create basic table that renders the rows & columns using `ATable` component.

Use `rows` prop to provide data to `ATable`. Defining columns for table is optional. When columns aren't specified via prop, columns will get calculate from first row.

:::code DemoTableBasic
<<< @/demos/table/DemoTableBasic.vue{33}
:::

:::: -->

<!-- 👉 Column Formatter -->
<!-- ::::card Column Formatter

Use `formatter` property while defining column to format the column text.

:::code DemoTableColumnFormatter
<<< @/demos/table/DemoTableColumnFormatter.vue{32}
:::

:::: -->

<!-- 👉 Slots -->
<!-- ::::card Slots

`ATable` provides scoped slot for rendering customer header for your column instead of just text via `header-<colName>` slot.

It also generates scoped slot based on your column name for rendering custom column. If your column name is `website` then you can use `col-website` scoped slot to render custom content in your column.

:::code DemoTableSlots
<<< @/demos/table/DemoTableSlots.vue{35-39,42-47}
:::

:::: -->

<!-- 👉 Server Side Table -->
<!-- ::::card Server Side Table

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

:::code DemoTableServerSideTable
<<< @/demos/table/DemoTableServerSideTable.vue{277-334,340}
:::

:::: -->

<!-- 👉 Filtering -->
::::card Filtering

Set `search` prop to `true` to enable table filtering.

Search will respect the column's `isFilterable` property to include or exclude the column from searching. If you don't specify column definition all columns will be filterable.

:::code DemoTableFiltering
<<< @/demos/table/DemoTableFiltering.vue{35}
:::

::::
