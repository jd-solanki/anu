import type { LiteralUnion, Simplify } from 'type-fest'
import type { StyleValue } from 'vue'

import type { AAlertProps } from '@/components/alert'
import type { AAvatarProps } from '@/components/avatar'
import type { ABadgeProps } from '@/components/badge'
import type { ABaseInputProps } from '@/components/base-input'
import type { ABtnProps } from '@/components/btn'
import type { ACardProps } from '@/components/card'
import type { ACheckboxProps } from '@/components/checkbox'
import type { AChipProps } from '@/components/chip'
import type { ADataTableProps } from '@/components/data-table'
import type { ADialogProps } from '@/components/dialog'
import type { ADrawerProps } from '@/components/drawer'
import type { AFloatingProps } from '@/components/floating'
import type { AIconProps } from '@/components/icon'
import type { AInputProps } from '@/components/input'
import type { AListProps } from '@/components/list'
import type { AListItemProps } from '@/components/list-item'
import type { ALoaderProps } from '@/components/loader'
import type { ALoadingIconProps } from '@/components/loading-icon'
import type { AMenuProps } from '@/components/menu'
import type { ARadioProps } from '@/components/radio'
import type { ARatingProps } from '@/components/rating'
import type { ASelectProps } from '@/components/select'

// import type { ASpinnerProps } from '@/components/spinner'
import type { ASwitchProps } from '@/components/switch'
import type { ATabProps } from '@/components/tab'
import type { ATableProps } from '@/components/table'
import type { ATabsProps } from '@/components/tabs'
import type { ATextareaProps } from '@/components/textarea'
import type { ATooltipProps } from '@/components/tooltip'
import type { ATypographyProps } from '@/components/typography'
import type { AViewProps } from '@/components/view'
import type { AViewsProps } from '@/components/views'

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
