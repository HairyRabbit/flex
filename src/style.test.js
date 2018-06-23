/**
 * @jest
 */

import render, { tpl } from './style'

/**
 * render
 */
test('should render styles', () => {
  expect(
    render([{
      name: 'foo',
      grids: [{
        name: 'left',
        flex: {
          basic: '1%',
          grow: null
        }
      },{
        name: 'right',
        flex: {
          basic: null,
          grow: 1
        }
      }]
    }])
  ).toEqual(
    `\
.foo {
  display: flex;
}

.foo-left {
  flex: 0 1%;
}

.foo-right {
  flex: 1;
}\
`
  )
})



/**
 * helpers
 */
test('should render tpl', () => {
  expect(
    tpl('foo', ['bar', 'baz'])
  ).toEqual(
    `\
.foo {
  bar
  baz
}\
`
  )
})
