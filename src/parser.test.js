/**
 * @jest
 */

import parse, { parseTable, parseContent } from './parser'

/**
 * parse table
 */
test('should parse table simple', () => {
  expect(
    parseTable(`
| 1 | 2 |
`)
  ).toEqual(
    [{
      name: 'left',
      direction: 'row',
      flex: {
        basic: '8.3333%',
        grow: null
      },
      justifyContent: undefined,
      alignItems: undefined
    },{
      name: 'right',
      direction: 'row',
      flex: {
        basic: '16.6667%',
        grow: null
      },
      justifyContent: undefined,
      alignItems: undefined
    }]
  )
})

test('should parse table named', () => {
  expect(
    parseTable(`
| foo.3rem | bar.- |
`)
  ).toEqual(
    [{
      name: 'foo',
      direction: 'row',
      flex: {
        basic: '3rem',
        grow: null
      },
      justifyContent: undefined,
      alignItems: undefined
    },{
      name: 'bar',
      direction: 'row',
      flex: {
        basic: null,
        grow: 1
      },
      justifyContent: undefined,
      alignItems: undefined
    }]
  )
})

test('should parse table left flag', () => {
  expect(
    parseTable(`
|+ foo.3rem |
`)
  ).toEqual(
    [{
      name: 'foo',
      direction: 'row',
      flex: {
        basic: '3rem',
        grow: null
      },
      justifyContent: 'center',
      alignItems: undefined
    }]
  )
})

test('should parse table right flag', () => {
  expect(
    parseTable(`
| foo.3rem +|
`)
  ).toEqual(
    [{
      name: 'foo',
      direction: 'row',
      flex: {
        basic: '3rem',
        grow: null
      },
      justifyContent: undefined,
      alignItems: 'center'
    }]
  )
})

test('should parse table left and right flag', () => {
  expect(
    parseTable(`
|+ foo.3rem +|
`)
  ).toEqual(
    [{
      name: 'foo',
      direction: 'row',
      flex: {
        basic: '3rem',
        grow: null
      },
      justifyContent: 'center',
      alignItems: 'center'
    }]
  )
})


/**
 * parse content
 */
// test('should parse content basic 12 grid', () => {
//   expect(
//     parseContent('4')
//   ).toEqual(
//     {
//       basic: {
//         type: 'grid',
//         value: 4
//       }
//     }
//   )
// })

// test('should parse content basic 12 grid last', () => {
//   expect(
//     parseContent('-')
//   ).toEqual(
//     {
//       basic: {
//         type: 'auto',
//         value: null
//       }
//     }
//   )
// })

// test('should parse content basic percent width', () => {
//   expect(
//     parseContent('40%')
//   ).toEqual(
//     {
//       bacic: {
//         type: 'percent',
//         value: 40
//       }
//     }
//   )
// })

// test('should parse content basic with value', () => {
//   expect(
//     parseContent('3rem')
//   ).toEqual(
//     {
//       bacic: {
//         type: 'value',
//         value: '3rem'
//       }
//     }
//   )
// })


/**
 * helpers
 */
