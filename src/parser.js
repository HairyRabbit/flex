/**
 * parser
 *
 * Parse config syntax
 *
 * @flow
 */

import type { Direction, AlignSymbol, Align, Content } from './'

export default function parse(input: string): string {
}

export function parseTable(input: string, field: string): Array<Content> {
  const str = input.trim()
  const sp = str[0]
  const dir = mapto_dir(sp)
  const cells = str.split(sp).filter(Boolean).map(s => s.trim())
  const len = cells.length
  const mapto_name = mapto_idx(len, field, dir)

  return cells.map((c, i) => {
    const named = mapto_name(i)
    const {
      name = named,
      flex,
      justifyContent,
      alignItems
    } = parseContent(c)

    return {
      name,
      direction: dir,
      flex,
      justifyContent,
      alignItems,
    }
  })
}

/**
 * parse contents
 *
 * * flex
 *
 * Configure 'flex-basic' and 'flex-grow'
 *
 * ** bootstrap like, 12 grids, e.g. `| 4 | 2 | - |`, yield:
 *
 * ```css
 * .left { flex: 0 33.3333%; }
 * .middle { flex: 0 16.6667%; }
 * .right { flex: 1; }
 * ```
 *
 * ** percents value, e.g. `| 30% | - | 20% |`, yield:
 *
 * ```css
 * .left { flex: 0 30%; }
 * .middle { flex: 1; }
 * .right { flex: 20%; }
 * ```
 *
 * ** normal values, e.g. `| 3rem | - | 3rem |`, yield:
 *
 * ```css
 * .left { flex: 0 3rem; }
 * .middle { flex: 1; }
 * .right { flex: 3rem; }
 * ```
 *
 * ** auto and grow, e.g. `| - |`, yield:
 *
 * ```css
 * .name { flex: 1; }
 * ```
 *
 * * justify content
 *
 * Setup justify content align
 *
 * ** flex-start(by default), e.g. `| - |`, yield:
 *
 * ```css
 * .name { flex: 1; }
 * ```
 *
 * ** flex-end, e.g. `|> - |`, yield:
 *
 * ```css
 * .name { flex: 1; justify-content: flex-end }
 * ```
 *
 * ** center, e.g. `|+ - |`, yield:
 *
 * ```css
 * .name { flex: 1; justify-content: center }
 * ```
 *
 * ** space-between, e.g. `|~ - |`, yield:
 *
 * ```css
 * .name { flex: 1; justify-content: space-between }
 * ```
 *
 * * align-items
 *
 * Setup items align
 *
 * ** normal, e.g. `| - |`, yield:
 *
 * ```css
 * .name { flex: 1; }
 * ```
 *
 * ** flex-start, e.g. `| - <|`, yield:
 *
 * ```css
 * .name { flex: 1; align-items: flex-start; }
 * ```
 *
 * ** flex-end, e.g. `| - >|`, yield:
 *
 * ```css
 * .name { flex: 1; align-items: flex-end; }
 * ```
 *
 * ** center, e.g. `| - +|`, yield:
 *
 * ```css
 * .name { flex: 1; align-items: center; }
 * ```
 *
 */
export function parseContent(input: string): Content {
  const re = /(?:(<|>|~|\+)\s+)?(?:([A-Za-z][A-Za-z0-9_-]*)\.?)?((?:\d+(?:px|rem|em|%)?)|-)(?:\s+(<|>|~|\+))?/
  const ma = input.match(re)

  if(!ma) {
    throw new Error(`Match regexp failed, ${input}`)
  }

  const [ _, justifyContent, name, value, alignItems ] = ma

  return {
    name,
    flex: parseValue(value),
    justifyContent: mapto_align(justifyContent),
    alignItems: mapto_align(alignItems)
  }
}

export function parseValue(input: string): $PropertyType<Content, 'flex'> {
  if('-' === input) {
    return {
      basic: null,
      grow: 1
    }
  }

  const re = /(px|rem|em|%)$/
  const ma = input.match(re)

  if(ma) {
    return {
      basic: input,
      grow: null
    }
  }

  return {
    basic: (parseInt(input) / 12 * 100).toFixed(4) + '%',
    grow: null
  }
}


export function mapto_dir(sp: string): Direction {
  switch(sp) {
    case '|':
      return 'row'
    case '-':
      return 'column'
    default:
      throw new Error(`Unknow split ${sp}`)
  }
}

export function mapto_dirlist(dir: Direction, len: number): Array<string> {
  switch(dir) {
    case 'row':
      return len < 3 ? ['left', 'right'] : ['left', 'middle', 'right']
    case 'column':
      return len < 3 ? ['top', 'bottom'] : ['top', 'middle', 'bottom']
    default:
      throw new Error(`Unknow direction ${dir}`)
  }
}

export function mapto_idx(len: number, name: string, dir: Direction) {
  return function mapto_idx(idx: number): string {
    switch(len) {
      case 1:
        return name
      case 2:
      case 3:
        return mapto_dirlist(dir, len)[idx]
      default:
        switch(idx % 10) {
          case 0:
            return `${idx + 1}st`
          case 1:
            return `${idx + 1}nd`
          case 2:
            return `${idx + 1}rd`
          default:
            return `${idx + 1}th`
        }
    }
  }
}

/**
 * map symbol to flex align value
 *
 * ```js
 * mapto_align('<') //=> 'flex-start'
 * mapto_align('>') //=> 'flex-end'
 * mapto_align('+') //=> 'center'
 * mapto_align('~') //=> 'space-bewteen'
 * ```
 */
export function mapto_align(input: AlignSymbol): Align {
  /**
   * handle `undefined`
   */
  if(!input) {
    return input
  }

  switch(input) {
    case '<':
      return 'flex-start'
    case '>':
      return 'flex-end'
    case '~':
      return 'space-bewteen'
    case '+':
      return 'center'
    default:
      throw new Error(`Unknow align flag: ${input}`)
  }
}
