import tailwindcss from 'tailwindcss'
import postcss from 'postcss'
import * as css from 'css'
import * as fs from 'node:fs'

const tailwindcssPlugin = tailwindcss({
  content: ['noop'],
  safelist: [{ pattern: /./ }],
})

postcss(tailwindcssPlugin)
  .process('@tailwind base; @tailwind components; @tailwind utilities', {
    from: undefined,
  })
  .then((result) => {
    const parsedCss = css.parse(result.css)
    const classMap: Record<string, Record<string, string>> = {}

    parsedCss.stylesheet?.rules.forEach((rule) => {
      if (isCssRuleType(rule)) {
        rule.selectors?.forEach((selector) => {
          if (!selector.startsWith('.')) return
          const properties: Record<string, string> = {}
          rule.declarations?.forEach((declaration) => {
            if (
              isCssDeclarationType(declaration) &&
              declaration.property &&
              declaration.value
            )
              properties[declaration.property] = declaration.value
          })
          classMap[selector.slice(1)] = properties
        })
      }
    })

    fs.writeFileSync(
      'tailwindcss-class-properties.json',
      JSON.stringify(classMap, null, 2)
    )
  })
  .catch(console.log)

function isCssRuleType(rule: any): rule is css.Rule {
  return rule.type === 'rule'
}

function isCssDeclarationType(
  declaration: any
): declaration is css.Declaration {
  return declaration.type === 'declaration'
}
