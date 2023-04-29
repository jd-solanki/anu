<script lang="ts" setup>
import dataTableApi from '@anu/component-meta/ADataTable.json';
import api from '@anu/component-meta/ATable.json';
</script>

# Table

:::card Variations
Anu provides two variations for table component:

1. `ATable` - Use this lightweight table for simply rendering rows & columns. This also support rending custom column content via slot & allow adding extra columns.
2. `ADataTable` - This table provide advanced features like sorting, searching & pagination. You can use this table to render the data from API. This component is build on top of `ATable` component.

:::

<!-- 👉 Basic -->
::::card Basic {bordered}

You can create basic table that renders the rows & columns using `ATable` component.

Use `rows` prop to provide data to `ATable`. Defining columns for table is optional. When columns aren't specified via prop, columns will get calculate from first row.

:::code DemoTableBasic
<<< @/components/demos/table/DemoTableBasic.vue{6}
:::

::::

:::details Demo data
In all table demos uses data for rows from below file.

<<< @/components/demos/table/data.ts
:::

<!-- 👉 Column Formatter -->
::::card Column Formatter {bordered}

Use `formatter` property while defining column to format the column text.

:::code DemoTableColumnFormatter
<<< @/components/demos/table/DemoTableColumnFormatter.vue{6}
:::

::::

<!-- 👉 Slots -->
::::card Slots {bordered}

`ATable` provides scoped slot for rendering customer header for your column instead of just text via `header-<colName>` slot.

It also generates scoped slot based on your column name for rendering custom column. If your column name is `website` then you can use `col-website` scoped slot to render custom content in your column.

:::code DemoTableSlots
<<< @/components/demos/table/DemoTableSlots.vue{7-13,15-21}
:::

::::

<!-- 👉 Extra Column -->
::::card Extra Column {bordered}

Define extra column in column definition to add column to table. Later, you can use column slot `col-<name>` to render your custom content.

Moreover, you can also omit the column definition to omit rendering the specific column.

:::code DemoTableExtraColumn
<<< @/components/demos/table/DemoTableExtraColumn.vue{16-40}
:::

::::

<!-- 👉 Filtering -->
::::card Filtering {bordered}

Set `search` prop to `true` to enable table filtering.

Search will respect the column's `isFilterable` property to include or exclude the column from searching. If you don't specify column definition all columns will be filterable.

:::code DemoTableFiltering
<<< @/components/demos/table/DemoTableFiltering.vue{8}
:::

::::

<!-- 👉 Sorting -->
::::card Sorting {bordered}

Sorting is enable by default and will respect the column's `isSortable` property. If you don't specify column definition all columns will be sortable.

To disable sorting on table use set `isSortable` prop to `false` on `ATable`.

Moreover, You can also sort multiple columns at once. You can enable it by setting `multiSort` prop to `true` on `ATable`.

:::code DemoTableSorting
<<< @/components/demos/table/DemoTableSorting.vue{4-8,14}
:::

::::

<!-- 👉 Server Side Table -->
::::card Server Side Table {bordered}

If your table data is coming from API/backend you can pass async function to `rows` prop which should resolve the below type:

```ts
interface rowsFunctionReturn {
  rows: unknown[]
  total: number
}
```

```ts{5}
const fetchRows = ({ q, currentPage, rowsPerPage, sortedCols }) => {
  // You can use => q, currentPage, rowsPerPage, sortedCols
    return fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => ({ rows: json, total: json.length }))
}
```

:::code DemoTableServerSideTable
<<< @/components/demos/table/DemoTableServerSideTable.vue{14,26-33,42}
:::

::::

<!-- 👉 API -->
## API

<Api title="Table" :api="api" class="mb-8"></Api>
<Api title="Data Table" :api="dataTableApi"></Api>
