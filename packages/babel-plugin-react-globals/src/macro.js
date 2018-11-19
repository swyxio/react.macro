const {createMacro} = require('babel-plugin-macros')
const {visitor} = require('./visitor')

module.exports = createMacro(myMacro)

function myMacro({references, _, babel}) {
  const {macro = []} = references
  const {types: t} = babel

  macro.forEach(referencePath => {
    if (isValidInvocation(referencePath)) {
      const prog = referencePath.findParent(x => x.isProgram())
      prog.traverse(visitor(t))
      // remove reference altogether
      const par = referencePath.findParent(x => x.isExpressionStatement())
      par.remove()
    }
  })
}

function isValidInvocation(path) {
  // strictly only one way to call this thing
  let par = path.parentPath
  if (!par.isCallExpression()) return false
  par = par.parentPath
  if (!par.isExpressionStatement()) return false
  par = par.parentPath
  if (!par.isProgram()) return false
  return true
}
