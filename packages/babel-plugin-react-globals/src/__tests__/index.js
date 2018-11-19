import path from 'path'
import pluginTester from 'babel-plugin-tester'
import plugin from '../'

const projectRoot = path.join(__dirname, '../../')

expect.addSnapshotSerializer({
  print(val) {
    return val.split(projectRoot).join('<PROJECT_ROOT>/')
  },
  test(val) {
    return typeof val === 'string'
  },
})
const fixture = filename => ({
  fixture: require.resolve(`./fixtures/${filename}`),
})

pluginTester({
  plugin,
  snapshot: true,
  babelOptions: {filename: __filename},
  tests: {
    'basic test of functionality': fixture('basic'),
  },
})
