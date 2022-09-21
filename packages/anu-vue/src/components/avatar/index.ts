// ❗ Avatar should be exported last. However, do to format on save it comes on top
export { AAvatar } from './AAvatar'

// export { avatarOnlyProps } from './props'

export const isAvatarUsed = (props: any): boolean => props.icon || props.src || props.content
