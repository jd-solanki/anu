import type { VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ATable } from '../src/components/table/ATable'

const nameList = Array.from(Array(10).keys()).map(x => {
  return { name: `name${x + 1}` }
})

// 👉 Mock ResizeObserver
// This is needed for ASelect autoupdate
const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

vi.stubGlobal('ResizeObserver', ResizeObserverMock)

describe('Testing ATable', async () => {
  let wrapper: VueWrapper
  beforeEach(() => {
    wrapper = mount(ATable,
      { props: { rows: nameList, pageSize: 5 }, slots: { } },
    )
  })
  it('mount component', () => {
    // check header
    expect(wrapper.findAll('table thead tr th').at(0)?.text()).toBe('name')

    // check rows
    expect(wrapper.findAll('table tbody tr td').at(0)?.text()).toBe('name1')
    expect(wrapper.findAll('table tbody tr td').at(1)?.text()).toBe('name2')

    // check pagination
    expect(wrapper.find('.a-table-pagination-meta')?.text()).toBe('1 - 5 of 10')

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('paging should update content and paging indicator', async () => {
  // trigger next page
    await wrapper.find('.a-table-footer-next-page-btn').trigger('click')

    // check rows
    expect(wrapper.findAll('table tbody tr td').at(0)?.text()).toBe('name6')
    expect(wrapper.findAll('table tbody tr td').at(1)?.text()).toBe('name7')

    // check pagination
    expect(wrapper.find('.a-table-pagination-meta')?.text()).toBe('6 - 10 of 10')
  })
})
