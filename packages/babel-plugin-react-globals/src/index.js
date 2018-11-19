const {visitor} = require('./visitor')

export default function(babel) {
  const {types: t} = babel

  return {
    name: 'babel-plugin-react-globals',
    visitor: visitor(t),
  }
}
