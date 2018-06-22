/**
 * render jsx for flex
 *
 * @flow
 */

export default function render(tree): string {

}

export function tpl() {
  return `\
import * as React from 'react'
import style from '${___filename}'

export default function flexLayout(props) {
  const children = props.children

  return (
    <div className={style[]}>
      ${children}
    </div>
  )
}
`
}
