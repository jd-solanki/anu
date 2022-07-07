<script lang="ts" setup>
import { useSearch } from 'anu-vue';
import { ref } from 'vue';

const q = ref('')
const fruits = ['banana', 'apple', 'watermelon', 'orange']
const { results } = useSearch(q, fruits)
</script>

# useSearch

## Array of string

`useSearch`'s `filterBy` param is optional when filtering array of string.

<AInput v-model="q" :hint="JSON.stringify(results)"></AInput>

## Array of objects

when `strict` search is `true` it will only filter on string otherwise it can filter on boolean & number type as well.

<div class="vp-raw">
    <DemoUseSearchArrayOfObjects></DemoUseSearchArrayOfObjects>
</div>
