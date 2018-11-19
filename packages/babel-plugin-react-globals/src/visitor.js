const hookApis = [
  'useState',
  'useReducer',
  'useContext',
  'useCallback',
  'useImperativeMethods',
  'useEffect',
  'useMutationEffect',
  'useLayoutEffect',
  'useMemo',
  'useRef',
]

const miscApis = [
  'Component',
  'PureComponent',
  'createContext',
  'createElement',
  'createFactory',
  'cloneElement',
  'isValidElement',
  'forwardRef',
  'createRef',
  'lazy',
  'memo',
]

const jsxApis = ['Fragment', 'Suspense', 'ConcurrentMode', 'StrictMode']

const allApis = miscApis.concat(hookApis)

export const visitor = t => ({
  Identifier(path) {
    if (checkIfReactAPI(allApis, path)) {
      const newME = t.memberExpression(
        t.identifier('React'),
        t.identifier(path.node.name),
      )
      path.replaceWith(newME)
      path.skip()
    }
  },
  JSXIdentifier(path) {
    if (checkIfReactAPI(jsxApis, path)) {
      const newME = t.jsxMemberExpression(
        t.jsxIdentifier('React'),
        t.jsxIdentifier(path.node.name),
      )
      path.replaceWith(newME)
      path.skip()
    }
  },
})

function checkIfReactAPI(apis, path) {
  // return false if inside a member expression already
  if (path.parentPath.isMemberExpression()) return false
  return apis.includes(path.node.name)
}
