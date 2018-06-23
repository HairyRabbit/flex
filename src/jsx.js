/**
 * render jsx for flex
 *
 * @flow
 */

export default function render(tree: Array<Section>, style: string): string {
  const acc = tree.map(item => {
    const { name } = item
    const items = item.grids.map((n, i) => {
      return `\
<div className={style['${name + '-' + n.name}']}>{props.children[${i}]}</div>`
    })
    return `\
export function ${name}(props) {
  return (
    <div className={style['${name}']}>
      ${items.join('\n\n      ')}
    </div>
  )
}`
  })

  return `\
import * as React from 'react'
import style from '${style.replace(/\\/g, '/')}'

${acc.join('\n\n')}`
}
