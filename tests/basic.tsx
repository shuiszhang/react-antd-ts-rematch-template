import React, { FunctionComponent, ComponentClass, Factory } from 'react'
import { shallow } from 'enzyme'

export function notCrash(Component) {
  describe(' - TEST - not crash', () => {
    it('should be rendered without crash', () => {
      shallow(<Component />)
    })
  })
}

export function defaultTag(
  Component: FunctionComponent<any> | ComponentClass,
  selector: string
) {
  describe(' - TEST - default tag', () => {
    it(`should be rendered default tag with ${selector}`, () => {
      const node = shallow(<Component />)
      expect(node.find(selector).hostNodes().length).toBeGreaterThanOrEqual(1)
    })
  })
}

export function defaultProps(
  Component: FunctionComponent<any> | ComponentClass,
  props: any = {}
) {
  describe(' - TEST - default props', () => {
    it('should be rendered with default props', () => {
      const node = shallow(<Component {...props} />)
      const keys = Object.keys(props)
      keys.forEach(key => {
        expect(node.prop(key)).toBe(props[key])
      })
    })
  })
}

export function renderChild(
  Component: FunctionComponent<any> | ComponentClass<any, any>,
  children: any,
  selector: any
) {
  describe('- TEST - render children', () => {
    it('should be rendered children', () => {
      const node = shallow(<Component>{children}</Component>)
      expect(node.find(selector).hostNodes().length).toBeGreaterThanOrEqual(1)
    })
  })
}

export function customTag(
  Component: FunctionComponent<any> | ComponentClass<any, any>,
  tag: string | Factory<any>,
  selector: string
) {
  describe(' - TEST - custom tags', () => {
    it(`should be rendered with custom tag with ${selector}`, () => {
      const node = shallow(<Component tag={tag} />)
      expect(node.find(selector).hostNodes().length).toBeGreaterThanOrEqual(1)
    })
  })
}

export function displayName(
  Component: FunctionComponent<any> | ComponentClass,
  name: string
) {
  describe(' - TEST - display name', () => {
    it(`should be rendered with ${name} name`, () => {
      expect(Component.displayName).toBe(name)
    })
  })
}
