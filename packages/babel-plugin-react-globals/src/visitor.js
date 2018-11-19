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
  'Fragment',
  'Component',
  'PureComponent',
  'Suspense',
  'createContext',
  'createElement',
  'createFactory',
  'cloneElement',
  'isValidElement',
  'Children',
  'forwardRef',
  'createRef',
  'lazy',
  'memo',
]

const allApis = miscApis.concat(hookApis)

export const visitor = t => ({
  Identifier(path) {
    if (checkIfReactHookAPI(path)) {
      const newME = t.memberExpression(
        t.identifier('React'),
        t.identifier(path.node.name),
      )
      path.replaceWith(newME)
      path.skip()
    }
  },
})

function checkIfReactHookAPI(path) {
  // return false if inside a member expression already
  if (path.parentPath.isMemberExpression()) return false
  return allApis.includes(path.node.name)
}
