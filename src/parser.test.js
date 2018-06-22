/**
 * @jest
 */

import parse, {
  parseTable,
  parseContent,
  parseValue
} from './parser'

/**
 * parse file
 */
test('should parse file content', () => {
  expect(
    parse(`
[foo]

| 1 | 2 | 3 |

[bar]

| 4 | 5 | 6 |

[baz]

| 7 | 8 | 9 |
`)
  ).toEqual(
    [{
      name: 'foo',
      direction: 'row',
      justifyContent: undefined,
      alignItems: undefined,
      grids: [{
        name: 'left',
        flex: {
          basic: '8.3333%',
          grow: null
        },
        justifyContent: undefined,
        alignItems: undefined
      },{
        name: 'middle',
        flex: {
          basic: '16.6667%',
          grow: null
        },
        justifyContent: undefined,
        alignItems: undefined
      },{
        name: 'right',
        flex: {
          basic: '25.0000%',
          grow: null
        },
        justifyContent: undefined,
        alignItems: undefined
      }]
    },{
      name: 'bar',
      direction: 'row',
      justifyContent: undefined,
      alignItems: undefined,
      grids: [{
        name: 'left',
        flex: {
          basic: '33.3333%',
          grow: null
        },
        justifyContent: undefined,
        alignItems: undefined
      },{
        name: 'middle',
        flex: {
          basic: '41.6667%',
          grow: null
        },
        justifyContent: undefined,
        alignItems: undefined
      },{
        name: 'right',
        flex: {
          basic: '50.0000%',
          grow: null
        },
        justifyContent: undefined,
        alignItems: undefined
      }]
    },{
      name: 'baz',
      direction: 'row',
      justifyContent: undefined,
      alignItems: undefined,
      grids: [{
        name: 'left',
        flex: {
          basic: '58.3333%',
          grow: null
        },
        justifyContent: undefined,
        alignItems: undefined
      },{
        name: 'middle',
        flex: {
          basic: '66.6667%',
          grow: null
        },
        justifyContent: undefined,
        alignItems: undefined
      },{
        name: 'right',
        flex: {
          basic: '75.0000%',
          grow: null
        },
        justifyContent: undefined,
        alignItems: undefined
      }]
    }]
  )
})


/**
 * parse table
 */
test('should parse table simple', () => {
  expect(
    parseTable(`| 1 | 2 |`).grids
  ).toEqual(
    [{
      name: 'left',
      flex: {
        basic: '8.3333%',
        grow: null
      },
      justifyContent: undefined,
      alignItems: undefined
    },{
      name: 'right',
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
    parseTable(`| foo.3rem | bar.- |`).grids
  ).toEqual(
    [{
      name: 'foo',
      flex: {
        basic: '3rem',
        grow: null
      },
      justifyContent: undefined,
      alignItems: undefined
    },{
      name: 'bar',
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
    parseTable(`|+ foo.3rem |`).grids
  ).toEqual(
    [{
      name: 'foo',
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
    parseTable(`| foo.3rem +|`).grids
  ).toEqual(
    [{
      name: 'foo',
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
    parseTable(`|+ foo.3rem +|`).grids
  ).toEqual(
    [{
      name: 'foo',
      flex: {
        basic: '3rem',
        grow: null
      },
      justifyContent: 'center',
      alignItems: 'center'
    }]
  )
})

test('should parse table for columns direction', () => {
  expect(
    parseTable(`/ 3rem /`, 'foo').grids
  ).toEqual(
    [{
      name: 'foo',
      flex: {
        basic: '3rem',
        grow: null
      },
      justifyContent: undefined,
      alignItems: undefined
    }]
  )
})

test('should parse table for columns direction and all features', () => {
  expect(
    parseTable(`/+ foo.3rem +/< 20% / - /`, 'foo').grids
  ).toEqual(
    [{
      name: 'foo',
      flex: {
        basic: '3rem',
        grow: null
      },
      justifyContent: 'center',
      alignItems: 'center'
    },{
      name: 'middle',
      flex: {
        basic: '20%',
        grow: null
      },
      justifyContent: 'flex-start',
      alignItems: undefined
    },{
      name: 'bottom',
      flex: {
        basic: null,
        grow: 1
      },
      justifyContent: undefined,
      alignItems: undefined
    }]
  )
})

test('should parse table with left and right symbols', () => {
  expect(
    parseTable(`
+ | 1 | 2 | +
`)
  ).toEqual(
    {
      name: undefined,
      direction: 'row',
      grids: [{
        name: 'left',
        flex: {
          basic: '8.3333%',
          grow: null
        },
        justifyContent: undefined,
        alignItems: undefined
      },{
        name: 'right',
        flex: {
          basic: '16.6667%',
          grow: null
        },
        justifyContent: undefined,
        alignItems: undefined
      }],
      justifyContent: 'center',
      alignItems: 'center'
    }
  )
})


/**
 * parse content
 */
test('should parse content basic 12 grid', () => {
  expect(
    parseContent('4')
  ).toEqual(
    {
      name: undefined,
      flex: {
        basic: '33.3333%',
        grow: null
      },
      justifyContent: undefined,
      alignItems: undefined
    }
  )
})

test('should parse content grow', () => {
  expect(
    parseContent('-')
  ).toEqual(
    {
      name: undefined,
      flex: {
        basic: null,
        grow: 1
      },
      justifyContent: undefined,
      alignItems: undefined
    }
  )
})

test('should parse content name', () => {
  expect(
    parseContent('foo.-')
  ).toEqual(
    {
      name: 'foo',
      flex: {
        basic: null,
        grow: 1
      },
      justifyContent: undefined,
      alignItems: undefined
    }
  )
})

test('should parse content left symbols', () => {
  expect(
    parseContent('+ -')
  ).toEqual(
    {
      name: undefined,
      flex: {
        basic: null,
        grow: 1
      },
      justifyContent: 'center',
      alignItems: undefined
    }
  )
})

test('should parse content right symbols', () => {
  expect(
    parseContent('- +')
  ).toEqual(
    {
      name: undefined,
      flex: {
        basic: null,
        grow: 1
      },
      justifyContent: undefined,
      alignItems: 'center'
    }
  )
})

test('should parse content all features', () => {
  expect(
    parseContent('+ foo.4 +')
  ).toEqual(
    {
      name: 'foo',
      flex: {
        basic: '33.3333%',
        grow: null
      },
      justifyContent: 'center',
      alignItems: 'center'
    }
  )
})


/**
 * parse value
 */
test('should parse value 12 grid', () => {
  expect(
    parseValue('4')
  ).toEqual(
    {
      basic: '33.3333%',
      grow: null
    }
  )
})

test('should parse value precent value', () => {
  expect(
    parseValue('40%')
  ).toEqual(
    {
      basic: '40%',
      grow: null
    }
  )
})

test('should parse value unit value', () => {
  expect(
    parseValue('40px')
  ).toEqual(
    {
      basic: '40px',
      grow: null
    }
  )
})

test('should parse value -', () => {
  expect(
    parseValue('-')
  ).toEqual(
    {
      basic: null,
      grow: 1
    }
  )
})


/**
 * helpers
 */
