<script setup lang="ts">
import type { DataTableItemsFunctionParams } from 'anu-vue'
import { fakeAPICall } from './data'

// 👉 Columns
const cols = [
  // ℹ️ We don't want to render all the columns from our rows so we are declaring those we want to get rendered
  { name: 'name' },
  { name: 'username' },
  { name: 'email' },
]

// 👉 rows function
function fetchItems({ q, currentPage, rowsPerPage, sortedCols }: DataTableItemsFunctionParams) {
  // ℹ️ You can use q, currentPage, rowsPerPage, sortedCols to fetch data from API
  // console.log('q :>> ', q, typeof q)
  // console.log('currentPage :>> ', currentPage)
  // console.log('rowsPerPage :>> ', rowsPerPage)
  // console.log('sortedCols :>> ', sortedCols)

  // ℹ️ Real API call (JSON Placeholder)
  // return fetch('https://jsonplaceholder.typicode.com/todos')
  //   .then(response => response.json())
  //   .then(json => ({ rows: json, total: json.length }))

  return fakeAPICall({ q, currentPage, rowsPerPage, sortedCols })

    // response.data => { rows: [...], total: 10 }
    .then(response => (response as any).data)
    .catch(() => {
      throw new Error('Error fetching rows...')
    })
}
</script>

<template>
  <ADataTable
    search
    :rows="fetchItems"
    :cols="cols"
    :page-size="5"
    @fetch="fetchItems"
  />
</template>
