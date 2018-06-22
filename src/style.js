/**
 * render style for flex
 *
 * @flow
 */

export default function render(tree: Array<Section>): string {
  const roles = []

  tree.forEach(a => {

    const sec_decls = []
    sec_decls.push('display: flex;')

    if('column' === a.direction) {
      sec_decls.push('flex-direction: column;')
    }

    if(a.justifyContent) {
      sec_decls.push(`justify-content: ${a.justifyContent};`)
    }

    if(a.alignItems) {
      sec_decls.push(`align-items: ${a.alignItems};`)
    }

    roles.push(tpl(a.section, sec_decls))

    a.grids.forEach(b => {
      const gd_decls = []

      if(b.flex.grow) {
        gd_decls.push('flex: 1;')
      } else {
        gd_decls.push(`flex: 0 ${b.flex.basic};`)
      }

      if(b.justifyContent || b.alignItems) {
        gd_decls.push('display: flex;')
      }

      if(b.justifyContent) {
        gd_decls.push(`justify-content: ${b.justifyContent};`)
      }

      if(b.alignItems) {
        gd_decls.push(`align-items: ${b.alignItems};`)
      }

      roles.push(tpl(`${a.section}-${b.name}`, gd_decls))
    })
  })

  return roles.join('\n\n')
}

export function tpl(role: string, decls: Array<string>): string {
  return `.${role} {
  ${decls.join('\n  ')}
}`
}
