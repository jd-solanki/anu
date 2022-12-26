import type { VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ADataTable, ATable } from '../src/components'

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

describe('Testing ATable & ADataTable', async () => {
  let wrapper: VueWrapper
  beforeEach(() => {
    wrapper = mount(ADataTable,
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
    expect(wrapper.find('.a-data-table-pagination-meta')?.text()).toBe('1 - 5 of 10')

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('paging should update content and paging indicator', async () => {
  // trigger next page
    await wrapper.find('.a-data-table-paginate-next').trigger('click')

    // check rows
    expect(wrapper.findAll('table tbody tr td').at(0)?.text()).toBe('name6')
    expect(wrapper.findAll('table tbody tr td').at(1)?.text()).toBe('name7')

    // check pagination
    expect(wrapper.find('.a-data-table-pagination-meta')?.text()).toBe('6 - 10 of 10')
  })

  it('overrides the header of the name column with the content of the header-name slot', () => {
    const wrapper = mount(ATable, {
      slots: {
        'header-name': 'Custom Name Header',
      },
      props: {
        rows: [{
          name: 'Leanne Graham',
          username: 'Bret',
          website: 'hildegard.org',
        }],
      },
    })
    const nameHeader = wrapper.find('th.a-table-table-th')

    expect(nameHeader.text()).toBe('Custom Name Header')
  })

  it('when overriding header slot, sort icon shouldn\'t get overridden', () => {
    const wrapper = mount(ADataTable, {
      slots: {
        'header-name': 'Custom Name Header',
      },
      props: {
        rows: [{
          name: 'Leanne Graham',
          username: 'Bret',
          website: 'hildegard.org',
        }],
      },
    })
    const nameHeader = wrapper.find('th.a-table-table-th')
    const upArrow = nameHeader.find('.i-bx-up-arrow-alt')
    const downArrow = nameHeader.find('.i-bx-down-arrow-alt')

    expect(nameHeader.text()).toBe('Custom Name Header')
    expect(upArrow.exists()).toBe(true)
    expect(downArrow.exists()).toBe(true)
  })
})
