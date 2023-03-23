<script lang="ts" setup>
import type { ExtractPropTypes, PropType } from 'vue'
import { TabBindingsSymbol } from './symbol'
import type { TabProps } from '@/components/tab'
import { ATab } from '@/components/tab'
import { ActiveViewSymbol } from '@/components/views/symbol'
import { useGroupModel } from '@/composables'
import { isObject } from '@/utils/helpers'

const props = defineProps({
  /**
   * Active tab
   */
  modelValue: { type: null },

  /**
   * Tabs to be rendered. Array of ATab props.
   */
  tabs: {
    type: Array as PropType<(TabProps | string)[]>,
    default: () => [],
  },

  /**
   * Create vertical tabs
   */
  vertical: {
    type: Boolean,
    default: false,
  },

  /**
   * Specify how tabs should be justified. Can be 'start', 'center', 'end', 'stretch''
   */
  // justify: {
  //   type: String as PropType<'start' | 'center' | 'end' | 'stretch'>,
  //   default: 'start',
  // },

  /**
   * Mark all `ATab` as stacked
   */
  tabStacked: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: (ExtractPropTypes<typeof props>)['modelValue']): void
}>()

defineOptions({
  name: 'ATabs',
})

const extractItemValueFromItemOption = (item: TabProps | string) => isObject(item) ? (item.value || item) : item

const { options, select: selectTab, value: activeTab } = useGroupModel({
  options: props.tabs.map(tab => extractItemValueFromItemOption(tab)),
})

// ℹ️ Inject active tab so we don't have to use `v-model` on `ATabs` and `AViews`
provide(ActiveViewSymbol, activeTab)

// get tabs ref
const refTabsWrapper = ref<HTMLElement>()

const refTabs = ref<ATab[]>([])

const refActiveTab = ref<ATab>()

const areTabsOverflowed = ref<boolean>()
const shouldShowArrows = computed(() => !props.vertical && areTabsOverflowed.value)

provide(TabBindingsSymbol, refTabs)

// Calculate classes for justify props
const tabJustifyClasses = computed(() => {
  const tabClasses = ref<any[]>([])
  const tabsWrapperClasses = ref<any[]>([])

  // if (props.justify === 'stretch') {
  //   tabClasses.value.push('flex-grow')
  // }

  // else {
  //   if (props.justify === 'center')
  //     tabsWrapperClasses.value.push('justify-center')

  //   else if (props.justify === 'end')
  //     tabsWrapperClasses.value.push('justify-end')

  //   else if (props.justify === 'start')
  //     tabsWrapperClasses.value.push('justify-start')
  // }

  // ATM, we aren't supporting justify prop.
  return {
    tabClasses: tabClasses.value,
    tabsWrapperClasses: tabsWrapperClasses.value,
  }
})

const handleTabClick = (tab: TabProps | string, index: number) => {
  const value = extractItemValueFromItemOption(tab)
  selectTab(value)
  emit('update:modelValue', value)

  // Set active tab ref to set active indicator styles
  refActiveTab.value = refTabs.value[index]

  refActiveTab.value.$el.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
    inline: 'nearest',
  })
  calculateActiveIndicatorStyle()
}

const activeIndicatorStyle = ref({})

const calculateActiveIndicatorStyle = () => {
  console.log('calculating...')
  if (!refActiveTab.value)
    return

  if ((refTabsWrapper.value?.scrollWidth || 0) > (refTabsWrapper.value?.clientWidth || 0))
    areTabsOverflowed.value = true

  const activeTabEl = refActiveTab.value.$el as HTMLDivElement

  if (props.vertical) {
    activeIndicatorStyle.value = {
      transform: `translateY(${activeTabEl.offsetTop}px)`,
      height: `${activeTabEl.offsetHeight}px`,
    }
  }

  else {
    activeIndicatorStyle.value = {
      transform: `translateX(${activeTabEl.offsetLeft}px)`,
      width: `${activeTabEl.offsetWidth}px`,
    }
  }
}
onMounted(calculateActiveIndicatorStyle)

// ℹ️ useGroupModel doesn't support initial value yet so we have to do it manually
onMounted(() => {
  if (props.modelValue)
    selectTab(props.modelValue)
  else
    handleTabClick(props.tabs[0], 0)
})

// Arrow navigation
const scrollSnapAlign = refAutoReset<'start' | 'end' | undefined>(undefined, 1500)
const scrollForward = async () => {
  scrollSnapAlign.value = 'end'
  await nextTick()
  refTabsWrapper.value?.scrollBy({
    left: 100,
    behavior: 'smooth',
  })
}

const scrollBackward = async () => {
  scrollSnapAlign.value = 'start'
  await nextTick()
  refTabsWrapper.value?.scrollBy({
    left: -100,
    behavior: 'smooth',
  })
}

// scroll
const isLeftNavArrowEnabled = ref()
const isRightNavArrowEnabled = ref(true)
const handleScroll = () => {
  if (refTabsWrapper.value) {
    isLeftNavArrowEnabled.value = !(refTabsWrapper.value.scrollLeft === 0)

    // ℹ️ This is a hack to fix a bug where `refTabsWrapper.value.scrollWidth === refTabsWrapper.value.scrollLeft + refTabsWrapper.value.clientWidth` gives `false` when the scroll is at the end
    isRightNavArrowEnabled.value = refTabsWrapper.value.scrollWidth - (refTabsWrapper.value.scrollLeft + refTabsWrapper.value.clientWidth) > 1
  }
}
</script>

<template>
  <div
    class="a-tabs relative"
    :class="[props.vertical && 'a-tabs-vertical']"
  >
    <!-- 👉 Previous arrow -->
    <div
      v-if="shouldShowArrows"
      class="a-tabs-navigation-arrow-wrapper w-8 absolute top-0 left-0 grid h-full place-items-center cursor-pointer"
      :class="[
        !isLeftNavArrowEnabled && 'opacity-50 pointer-events-none',
      ]"
      @click="scrollBackward"
    >
      <div class="a-tabs-navigation-arrow-previous i-bx-left-arrow-alt" />
    </div>
    <!-- TODO: align mx-8 amd w-8 & calc -->
    <div
      ref="refTabsWrapper"
      class="a-tabs-wrapper relative overflow-x-auto"
      style="scroll-snap-type: inline mandatory;"
      :class="[
        tabJustifyClasses.tabsWrapperClasses,
        props.vertical && 'flex-col',
        props.vertical ? 'inline-flex items-start' : 'flex items-center',
        shouldShowArrows && 'mx-8 max-w-[calc(100%-4rem)]',
      ]"
      @scroll="handleScroll"
    >
      <slot name="tabs">
        <ATab
          v-for="(tab, i) in props.tabs"
          :key="i"
          ref="refTabs"
          v-bind="typeof tab === 'string' ? { title: tab } : tab"
          :class="[tabJustifyClasses.tabClasses]"
          :stacked="props.tabStacked"
          :style="{
            scrollSnapAlign,
          }"
          @click="handleTabClick(tab, i)"
        />
      </slot>

      <div
        class="a-active-indicator absolute bg-primary bottom-0 transition-all duration-200 ease-in-out will-change-transform,width,height"
        :class="[props.vertical ? 'w-2px right-0 top-0' : 'left-0 h-2px']"
        :style="activeIndicatorStyle"
      />
    </div>

    <!-- 👉 Next arrow -->
    <div
      v-if="shouldShowArrows"
      class="a-tabs-navigation-arrow-wrapper w-8 absolute top-0 right-0 grid h-full place-items-center cursor-pointer"
      :class="[
        !isRightNavArrowEnabled && 'opacity-50 pointer-events-none',
      ]"
      @click="scrollForward"
    >
      <div class="a-tabs-navigation-arrow-previous i-bx-right-arrow-alt" />
    </div>

    <div class="a-tabs-content">
      <!-- 👉 Slot: Default => For rendering `AViews` -->
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.a-tabs-wrapper {
  &::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
& {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
}
</style>
