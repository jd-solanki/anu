<script setup lang="ts">
const route = useRoute()

const { data: navigation } = await useAsyncData('navigation', () => {
  return fetchContentNavigation()
})

const navData = toRaw(navigation.value.find(item => item._path === '/guide').children)

// const { data } = await useAsyncData('home', () => queryContent(route.fullPath).findOne())
// const onThisPage = ref([])
// if (data.value)
//   onThisPage.value = data.value.body.children.filter(e => e.tag === 'h2').map(e => toRaw(e))
</script>

<template>
  <main class="container mx-auto flex transform translate-1">
    <ADrawer class="w-[260px] text-gray-400 pt-4">
      <section v-for="section in navData" :key="section.title">
        <p class="text-lg font-semibold mb-2">
          {{ section.title }}
        </p>
        <ul>
          <li
            v-for="item in section.children" :key="item.title"
            class="py-1 hover:text-gray-600 transition duration-250 ease-in-out"
          >
            <NuxtLink :to="item._path">
              {{ item.title }}
            </NuxtLink>
          </li>
        </ul>
      </section>
    </ADrawer>
    <div class="prose">
      <ContentDoc />
    </div>
    <!-- 👉 On this page -->
    <!-- <div class="ml-8">
      <p class="font-semibold text-gray-400 mb-2">
        On this page
      </p>
      <ul>
        <li v-for="item in onThisPage" class="pt-1">
          <NuxtLink
            class="text-gray-400 hover:text-gray-600 transition duration-250 ease-in-out"
            :to="`${$route.path}#${item.props.id}`"
          >
            {{
              item.children[0].value
            }}
          </NuxtLink>
        </li>
      </ul>
    </div> -->
  </main>
</template>
