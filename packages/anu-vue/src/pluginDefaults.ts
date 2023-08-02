import type { LiteralUnion, Simplify } from 'type-fest'
import type { StyleValue } from 'vue'

import type { AAlertProps } from 'anu-vue/components/alert'
import type { AAvatarProps } from 'anu-vue/components/avatar'
import type { ABadgeProps } from 'anu-vue/components/badge'
import type { ABaseInputProps } from 'anu-vue/components/base-input'
import type { ABtnProps } from 'anu-vue/components/btn'
import type { ACardProps } from 'anu-vue/components/card'
import type { ACheckboxProps } from 'anu-vue/components/checkbox'
import type { AChipProps } from 'anu-vue/components/chip'
import type { ADataTableProps } from 'anu-vue/components/data-table'
import type { ADialogProps } from 'anu-vue/components/dialog'
import type { ADrawerProps } from 'anu-vue/components/drawer'
import type { AFloatingProps } from 'anu-vue/components/floating'
import type { AIconProps } from 'anu-vue/components/icon'
import type { AInputProps } from 'anu-vue/components/input'
import type { AListProps } from 'anu-vue/components/list'
import type { AListItemProps } from 'anu-vue/components/list-item'
import type { ALoaderProps } from 'anu-vue/components/loader'
import type { ALoadingIconProps } from 'anu-vue/components/loading-icon'
import type { AMenuProps } from 'anu-vue/components/menu'
import type { ARadioProps } from 'anu-vue/components/radio'
import type { ARatingProps } from 'anu-vue/components/rating'
import type { ASelectProps } from 'anu-vue/components/select'

// import type { ASpinnerProps } from 'anu-vue/components/spinner'
import type { ASwitchProps } from 'anu-vue/components/switch'
import type { ATabProps } from 'anu-vue/components/tab'
import type { ATableProps } from 'anu-vue/components/table'
import type { ATabsProps } from 'anu-vue/components/tabs'
import type { ATextareaProps } from 'anu-vue/components/textarea'
import type { ATooltipProps } from 'anu-vue/components/tooltip'
import type { ATypographyProps } from 'anu-vue/components/typography'
import type { AViewProps } from 'anu-vue/components/view'
import type { AViewsProps } from 'anu-vue/components/views'

interface ComponentProps {
  AAlert: AAlertProps
  AAvatar: AAvatarProps
  ABadge: ABadgeProps
  ABaseInput: ABaseInputProps
  ABtn: ABtnProps
  ACard: ACardProps
  ACheckbox: ACheckboxProps
  AChip: AChipProps
  ADataTable: ADataTableProps
  ADialog: ADialogProps
  ADrawer: ADrawerProps
  AFloating: AFloatingProps
  AIcon: AIconProps
  AInput: AInputProps
  AList: AListProps
  AListItem: AListItemProps
  ALoader: ALoaderProps
  ALoadingIcon: ALoadingIconProps
  AMenu: AMenuProps
  ARadio: ARadioProps
  ARating: ARatingProps
  ASelect: ASelectProps

  // ASpinner: ASpinnerProps
  ASwitch: ASwitchProps
  ATab: ATabProps
  ATable: ATableProps
  ATabs: ATabsProps
  ATextarea: ATextareaProps
  ATooltip: ATooltipProps
  ATypography: ATypographyProps
  AView: AViewProps
  AViews: AViewsProps
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type PluginOptionDefaultsKeys = LiteralUnion<keyof ComponentProps, string>

export type PluginOptionDefaults = {
  [key in keyof ComponentProps]: Simplify<ComponentProps[key]>
  & PluginOptionDefaults
  & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    class: any
    style: StyleValue
    attrs: Record<string, unknown>
  }
}
