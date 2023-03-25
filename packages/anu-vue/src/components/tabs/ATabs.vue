<script lang="ts" setup>
import type { TabsProps } from './props'
import { tabsProps } from './props'
import { TabBindingsSymbol } from './symbol'
import type { TabProps } from '@/components/tab'
import { ATab } from '@/components/tab'
import { AView } from '@/components/view'
import { AViews } from '@/components/views'
import { ActiveViewSymbol } from '@/components/views/symbol'
import { useGroupModel } from '@/composables'

const props = defineProps(tabsProps)

const emit = defineEmits<{
  (e: 'update:modelValue', value: TabsProps['modelValue']): void
}>()

defineOptions({
  name: 'ATabs',
})

// DOM refs
const refTabsWrapper = ref<HTMLElement>()
const refTabs = ref<ATab[]>([])
const refActiveTab = ref<ATab>()

// TODO: Check do we need this elsewhere
const groupModelOptions = computed(() => {
  /**
   * If props.tabs is array of string => array of string
   * If props.tabs is array of object
   *  - If object has value prop => array of value
   *  - else => array length
   */

  if (props.tabs.length === 0)
    return []

  const firstTab = props.tabs[0]
  if (typeof firstTab === 'string') {
    return props.tabs
  }

  else {
    if (firstTab.value)
      return props.tabs.map(tab => (tab as TabProps).value)

    return props.tabs.length
  }
})

const { options, select: selectTab, value: activeTab } = useGroupModel({
  options: groupModelOptions.value,
})

// ℹ️ Inject active tab so we don't have to use `v-model` on `ATabs` and `AViews`
provide(ActiveViewSymbol, activeTab)
provide(TabBindingsSymbol, refTabs)

// Flag to check if tabs are overflowed (For showing arrows)
const areTabsOverflowed = ref<boolean>()
const shouldShowArrows = computed(() => !props.vertical && areTabsOverflowed.value)

const checkAreTabsOverflowed = () => {
  if (props.vertical)
    return

  const tabsWrapper = refTabsWrapper.value
  if (tabsWrapper) {
    const { scrollWidth, clientWidth } = tabsWrapper
    areTabsOverflowed.value = scrollWidth > clientWidth
  }

  else { areTabsOverflowed.value = false }
}
useEventListener('resize', useDebounceFn(checkAreTabsOverflowed))

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

const activeIndicatorStyle = ref({})

const calculateActiveIndicatorStyle = () => {
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

const handleTabClick = (tab: TabProps | string, index: number) => {
  const value = options.value[index].value
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

onMounted(calculateActiveIndicatorStyle)

// ℹ️ useGroupModel doesn't support initial value yet so we have to do it manually
onMounted(() => {
  if (props.modelValue)
    handleTabClick(props.tabs[props.modelValue], props.modelValue)
  else
    handleTabClick(props.tabs[0], 0)
})

// Arrow navigation & Scroll snapping
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

// Check arrows and update active indicator style on tabs change
watch(() => props.tabs.length, () => {
  nextTick(() => {
    checkAreTabsOverflowed()
    calculateActiveIndicatorStyle()
  })
})
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
          :stacked="props.stackedTabs"
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
      <AViews
        v-model="activeTab"
        :transition="transition"
      >
        <AView
          v-for="(option, index) in options"
          :key="index"
          :value="option.value"
        >
          <slot :name="option.value" />
        </AView>
      </AViews>
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
