import { createVNode, render } from 'vue'
import Message from '@/components/Message.vue'

interface messageOptions {
  content: string
  duration?: number
  color?: 'success' | 'info' | 'warning' | 'danger'
}

function createMessage(options: messageOptions) {
  const container = document.createElement('div')
  const props = {
    ...options,
    onDestroy: () => {
      render(null, container)
    },
  }
  const vnode = createVNode(
    Message,
    props,
  )

  render(vnode, container)
  const vm = vnode.component!

  const handler = {
    close: () => {
      vm.exposed!.visible.value = false
    },
  }
  document.body.append(container.firstChild!)

  const instance = {
    vnode,
    handler,
  }

  return instance
}

export default function useMessage() {
  const message = (options: messageOptions) => createMessage(options)

  return message
}
