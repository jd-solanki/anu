import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick, ref } from 'vue'
import { AAlert, ABtn, ACard, AConfig } from '../src'

describe('AConfig', () => {
  let wrapper: ReturnType<typeof mount<AConfig>>

  function getSelectorStyle(selector: string) {
    return wrapper.find(selector).attributes('style')
  }

  afterEach(() => {
    wrapper.unmount()
  })

  it('should provide config to matched component', () => {
    const props = ref({
      ABtn: { color: 'success' },
      AAlert: { color: 'info' },
    })
    wrapper = mount(() =>
      <AConfig props={props.value}>
        <AAlert>Alert</AAlert>
        <ABtn>Btn</ABtn>
      </AConfig>,
    )
    expect(getSelectorStyle('.a-btn')).toContain('--a-success')
    expect(getSelectorStyle('.a-alert')).toContain('--a-info')
  })

  it('config can be reactive', async () => {
    const props = ref({
      ABtn: { color: 'success' },
    })
    wrapper = mount(() =>
      <AConfig props={props.value}>
        <ABtn>Btn</ABtn>
      </AConfig>,
    )
    expect(getSelectorStyle('.a-btn')).toContain('--a-success')
    props.value.ABtn.color = 'info'
    await nextTick()
    expect(getSelectorStyle('.a-btn')).toContain('--a-info')
  })

  it('should apply nested config correctly', () => {
    const props = ref({
      ABtn: { color: 'success' },
    })
    const nestedProps = ref({
      ABtn: { color: 'info' },
    })
    wrapper = mount(() =>
      <AConfig props={props.value}>
        <ACard>
          <AConfig props={nestedProps.value}>
            <ABtn>Btn</ABtn>
          </AConfig>
        </ACard>
      </AConfig>,
    )
    expect(getSelectorStyle('.a-btn')).toContain('--a-info')
  })
})
