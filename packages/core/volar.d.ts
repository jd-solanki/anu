declare module 'vue' {
  export interface GlobalComponents {
    AAccordion: typeof import('@anu-vue/core')['AAccordion']
    AAccordionItem: typeof import('@anu-vue/core')['AAccordionItem']
  }
}

export {}
