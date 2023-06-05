import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick, ref } from 'vue'
import { ASelect } from '../src'

describe('Testing ASelect', async () => {
  let wrapper: ReturnType<typeof mount<ASelect>>

  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('should render', () => {
    const options = ref(['banana', 'apple', 'watermelon'])
    wrapper = mount(() =>
      <ASelect options={options.value}></ASelect>,
    { attachTo: 'body' },
    )
    expect(wrapper).toBeDefined()
  })

  it('should select default value', async () => {
    const options = ref(['banana', 'apple', 'watermelon'])
    const modelValue = ref('apple')
    wrapper = mount(() =>
      <ASelect
        v-model={modelValue.value}
        options={options.value}
      ></ASelect>,
    { attachTo: 'body' },
    )
    await nextTick()
    const inputElement = wrapper.find('.a-select-input').element as HTMLInputElement
    expect(inputElement.value).toContain('apple')
  })

  it('should render card slots', async () => {
    const options = ref(['banana', 'apple', 'watermelon'])
    wrapper = mount(ASelect, {
      props: {
        options: options.value,
      },
      slots: {
        title: '<div class="title-slot">title</div>',
        subtitle: '<div class="subtitle-slot">subtitle</div>',
      },
      attachTo: 'body',
    })
    await wrapper.find('.a-select-input').trigger('click')
    await nextTick()
    const titleText = document.querySelector('.title-slot')?.textContent
    const subTitleText = document.querySelector('.subtitle-slot')?.textContent
    expect(titleText).toBe('title')
    expect(subTitleText).toBe('subtitle')
  })
})
