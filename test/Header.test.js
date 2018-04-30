import Vue from 'vue'
import Header from '~/components/Header.vue'

describe('Header.test.js', () => {
  let cmp, vm

  beforeEach(() => {
    cmp = Vue.extend(Header) // Create a copy of the original component
    vm = new cmp({
      data: { // Replace data value with this fake data
        messages: ['Cat']
      }
    }).$mount() // Instances and mounts the component
  })

  it('equals messages to ["Cat"]', () => {
    expect(vm.messages).toEqual(['Cat'])
  })
})
