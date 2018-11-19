const {createMacro} = require('babel-plugin-macros')
const {visitor} = require('./visitor')

module.exports = createMacro(myMacro)

function myMacro({references, _, babel}) {
  const {macro = [], default: defaultImport = []} = references
  const {types: t} = babel
  macro.forEach(referencePath => {
    if (isValidMacroInvocation(referencePath)) {
      const prog = referencePath.find(x => x.isProgram())
      prog.traverse(visitor(t))
      // import React if not already imported
      if (!isReactAlreadyImported(prog, defaultImport)) {
        const importSpecifiers = [
          t.importDefaultSpecifier(t.identifier('React')),
        ]
        const source = t.stringLiteral('react')
        const ast = t.importDeclaration(importSpecifiers, source)
        prog.unshiftContainer('body', ast)
      }
      // remove the macro() reference as last step
      const par = referencePath.findParent(x => x.isExpressionStatement())
      par.remove()
    }
  })
}

function isReactAlreadyImported(prog, defaultImport) {
  if (prog.scope.references.React && defaultImport.length < 1) return true
  if (defaultImport.length < 1) return false
  if (defaultImport[0].node.name === 'React') return false
  return true
}

function isValidMacroInvocation(path) {
  // strictly only one way to call this thing
  let par = path.parentPath
  if (!par.isCallExpression()) return false
  par = par.parentPath
  if (!par.isExpressionStatement()) return false
  par = par.parentPath
  if (!par.isProgram()) return false
  return true
}
