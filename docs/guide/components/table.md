<script lang="ts" setup>
import api from '@anu/component-meta/ATable.json';
</script>

# Table

<!-- 👉 Basic -->
::::card Basic

Use `rows` prop to provide data to `ATable`. Defining columns for table is optional. When columns aren't specified, columns will get calculate from first row and all columns will be filterable and sortable.

:::code DemoTableBasic
<<< @/demos/table/DemoTableBasic.vue{33}
:::

::::

<!-- 👉 Column Definition -->
::::card Column Definition

You can use `columns` prop to define columns for the table.

:::code DemoTableColumnDefinition
<<< @/demos/table/DemoTableColumnDefinition.vue{30-34,41}
:::

::::

<!-- 👉 Column Formatter -->
::::card Column Formatter

Use `formatter` property while defining column to format the column text.

:::code DemoTableColumnFormatter
<<< @/demos/table/DemoTableColumnFormatter.vue{32}
:::

::::

<!-- 👉 Column Slot -->
::::card Column Slot

`ATable` generates scoped slot based on your column name. If your column name is `website` then you can use `col-website` scoped slot to render custom content in your column.

:::code DemoTableColumnSlot
<<< @/demos/table/DemoTableColumnSlot.vue{35-39,42-47}
:::

::::

<!-- 👉 Filtering -->
::::card Filtering

Set `search` prop to `true` to enable table filtering.

Search will respect the column's `isFilterable` property to include or exclude the column from searching. If you don't specify column definition all columns will be filterable.

:::code DemoTableFiltering
<<< @/demos/table/DemoTableFiltering.vue{35}
:::

::::

<!-- 👉 Sorting -->
::::card Sorting

Sorting is enable by default and will respect the column's `isSortable` property. If you don't specify column definition all columns will be sortable.

To disable sorting on table use set `isSortable` prop to `false` on `ATable`.

Moreover, You can also sort multiple columns at once. You can enable it by setting `multiSort` prop to `true` on `ATable`.

:::code DemoTableSorting
<<< @/demos/table/DemoTableSorting.vue
:::

::::

<!-- 👉 Extra Column -->
::::card Extra Column

Define extra column in column definition to add column to table. Later, you can use column slot `row-<name>` to render your custom content.

Moreover, you can also omit the column definition to omit rendering the specific column.

:::code DemoTableExtraColumn
<<< @/demos/table/DemoTableExtraColumn.vue{33,43-67}
:::

::::

<!-- 👉 Server Side Table -->
::::card Server Side Table

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

::::

<!-- 👉 API -->
## API

<Api :api="api"></Api>
