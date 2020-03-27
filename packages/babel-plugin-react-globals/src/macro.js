const {createMacro} = require('babel-plugin-macros')
const {visitor} = require('./visitor')

module.exports = createMacro(myMacro)

function myMacro({state, babel}) {
  const {types: t} = babel
  insertReactImport(state.file.path, t)
  state.file.path.traverse(visitor(t))
}

function insertReactImport(node, t) {
  const importSpecifiers = [t.importDefaultSpecifier(t.identifier('React'))]
  const source = t.stringLiteral('react')
  const ast = t.importDeclaration(importSpecifiers, source)
  node.unshiftContainer('body', ast)
}
