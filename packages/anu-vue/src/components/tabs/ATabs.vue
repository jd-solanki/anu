<script lang="ts" setup>
import type { UseSwipeDirection } from '@vueuse/core'
import type { ATabsEvents } from './meta'
import { aTabsProps } from './meta'
import { ATabBindingsSymbol } from './symbol'
import type { ATabProps } from '@/components/tab'
import { ATab } from '@/components/tab'
import { AView } from '@/components/view'
import { AViews } from '@/components/views'
import { ActiveViewSymbol } from '@/components/views/symbol'
import { useSelection } from '@/composables'
import { useDefaults } from '@/composables/useDefaults'
import { numRange } from '@/utils/helpers'

// import { aTabsSlots } from './meta';

// SECTION Meta
const _props = defineProps(aTabsProps)
const emit = defineEmits<ATabsEvents>()

// defineSlots<typeof aTabsSlots>()

defineOptions({
  name: 'ATabs',
})
const { props, defaultsClass, defaultsStyle, defaultsAttrs } = useDefaults(_props)

// !SECTION

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
    if (firstTab?.value)
      return props.tabs.map(tab => (tab as ATabProps).value)

    return numRange(props.tabs.length)
  }
})

const { options, select: selectTab, value: activeTab } = useSelection({
  items: groupModelOptions.value,
  initialValue: toRef(() => {
    const initialVal = props.modelValue || groupModelOptions.value[0]

    return initialVal.value ?? initialVal
  }),
})

// ℹ️ Inject active tab so we don't have to use `v-model` on `ATabs` and `AViews`
provide(ActiveViewSymbol, activeTab)
provide(ATabBindingsSymbol, refTabs)

// 👉 Tabs dynamic transition
const tabsDynamicTransition = ref<'view-next' | 'view-previous'>()
const activeTabIndex = ref(-1)

// Flag to check if tabs are overflowed (For showing arrows)
const areTabsOverflowed = ref<boolean>()
const shouldShowArrows = computed(() => !props.vertical && areTabsOverflowed.value)

function checkAreTabsOverflowed() {
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

function calculateActiveIndicatorStyle() {
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

function handleTabClick(tab: ATabProps | string, index: number) {
  const value = options.value[index]?.value
  selectTab(value)
  emit('update:modelValue', value)
}

const { trigger: triggerActiveTabWatcher } = watchTriggerable(activeTab, val => {
  const index = options.value.findIndex(option => option.value === val)

  const previousActiveTabIndex = activeTabIndex.value
  activeTabIndex.value = index

  // ℹ️ Calculate dynamic transition for tabs
  if (activeTabIndex.value > previousActiveTabIndex)
    tabsDynamicTransition.value = 'view-next'
  else
    tabsDynamicTransition.value = 'view-previous'

  // Set active tab ref to set active indicator styles
  refActiveTab.value = refTabs.value[index]

  refActiveTab.value?.$el.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
    inline: 'nearest',
  })
  calculateActiveIndicatorStyle()
})

onMounted(triggerActiveTabWatcher)

// ℹ️ useSelection doesn't support initial value yet so we have to do it manually
// onMounted(() => {
//   if (props.modelValue) {
//     const tabToSelect = props.tabs[props.modelValue]
//     tabToSelect && handleTabClick(tabToSelect, props.modelValue)
//   }
//   else {
//     const tabToSelect = props.tabs[0]
//     tabToSelect && handleTabClick(tabToSelect, 0)
//   }
// })

// Arrow navigation & Scroll snapping
const scrollSnapAlign = refAutoReset<'start' | 'end' | 'center' | undefined>(undefined, 1500)
async function scrollForward() {
  scrollSnapAlign.value = 'end'
  await nextTick()
  refTabsWrapper.value?.scrollBy({
    left: 100,
    behavior: 'smooth',
  })
}

async function scrollBackward() {
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
function handleScroll() {
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

// SECTION: Swipe navigation
useSwipe(refTabsWrapper, {
  threshold: 10,
  onSwipe: useDebounceFn(() => {
    scrollSnapAlign.value = 'center'
  }),
})

const handleTabsContentSwipe = useDebounceFn((direction: UseSwipeDirection) => {
  // ℹ️ Flag to check if the next tab is found because forEach doesn't support `break` statement
  let nextTabFound = false

  /**
   * Loop over `options` and find the index of the active tab
   * Then, check if the direction is left or right and navigate accordingly
   */
  options.value.forEach((option, index) => {
    if (nextTabFound || option.value !== activeTab.value)
      return

    if (direction === 'left') {
      const nextTabIndex = index + 1
      if (nextTabIndex < options.value.length) {
        nextTabFound = true
        handleTabClick(props.tabs[nextTabIndex] as string | ATabProps, nextTabIndex)
      }
    }

    else if (direction === 'right') {
      const prevTabIndex = index - 1
      if (prevTabIndex >= 0) {
        nextTabFound = true
        handleTabClick(props.tabs[prevTabIndex] as string | ATabProps, prevTabIndex)
      }
    }
  })
})

// !SECTION
</script>

<template>
  <div
    v-bind="defaultsAttrs"
    :style="defaultsStyle"
    class="a-tabs"
    :class="[
      props.vertical ? 'a-tabs-vertical' : 'a-tabs-horizontal',
      shouldShowArrows && 'a-tabs-with-arrows',
      defaultsClass,
    ]"
  >
    <div class="a-tabs-header relative">
      <!-- 👉 Previous arrow -->
      <div
        v-if="shouldShowArrows"
        class="a-tabs-navigation-arrow-wrapper absolute top-0 left-0 grid h-full place-items-center cursor-pointer"
        :class="[!isLeftNavArrowEnabled && 'pointer-events-none']"
        @click="scrollBackward"
      >
        <!-- ℹ️ Adding opacity-50 above makes border bottom less visible -->
        <div
          class="a-tabs-navigation-arrow-previous transition-opacity"
          :class="[!isLeftNavArrowEnabled && 'opacity-50']"
        />
      </div>
      <div
        ref="refTabsWrapper"
        class="a-tabs-wrapper relative overflow-x-auto snap-x snap-mandatory"
        :class="[
          tabJustifyClasses.tabsWrapperClasses,
          props.vertical && 'flex-col',
          props.vertical ? 'inline-flex items-start' : 'flex items-center',
        ]"
        @scroll="handleScroll"
      >
        <slot name="tabs">
          <ATab
            v-for="(tab, i) in props.tabs"
            :key="i"
            ref="refTabs"
            v-bind="typeof tab === 'string' ? { title: tab } : tab"
            :class="[
              options[i]?.isSelected && 'a-tab-active',
              tabJustifyClasses.tabClasses,
            ]"
            :stacked="props.stackedTabs"
            :hide-title-on-mobile="props.hideTitleOnMobile"
            :style="{
              scrollSnapAlign,
            }"
            @click="handleTabClick(tab, i)"
          />
        </slot>
        <div
          class="a-tabs-active-indicator absolute"
          :class="[props.vertical ? 'right-0 top-0' : 'left-0']"
          :style="activeIndicatorStyle"
        />
      </div>
      <!-- 👉 Next arrow -->
      <div
        v-if="shouldShowArrows"
        class="a-tabs-navigation-arrow-wrapper absolute top-0 right-0 grid h-full place-items-center cursor-pointer"
        :class="[
          !isRightNavArrowEnabled && 'pointer-events-none',
        ]"
        @click="scrollForward"
      >
        <!-- ℹ️ Adding opacity-50 above makes border bottom less visible -->
        <div
          class="a-tabs-navigation-arrow-next transition-opacity"
          :class="[!isRightNavArrowEnabled && 'opacity-50']"
        />
      </div>
    </div>

    <div class="a-tabs-content">
      <!-- 👉 Slot: Default => For rendering `AViews` -->
      <AViews
        v-model="activeTab"
        :transition="props.transition === undefined ? tabsDynamicTransition : props.transition"
        @swipe="handleTabsContentSwipe"
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
