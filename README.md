# babel plugin/macro for react globals

> react plugin and macro that lets you write the React APIs as if they were all globals

This:

```js
/*eslint no-undef: 0 */
import React from "react.macro"; //optional if not using babel macro

const ctx = createContext(5);
export default function Timer() {
  const [state, setState] = useState(0);
  const myRef = React.useRef(0);
  return <Suspense>{state}</Suspense>;
}
```

Translates to:

```js
/*eslint no-undef: 0 react/jsx-no-undef: 0*/
import React from "react";

const ctx = React.createContext(5);
export default function Timer() {
  const [state, setState] = React.useState(0);
  const myRef = React.useRef(0);
  return <React.Suspense>{state}</React.Suspense>;
}
```

Turning off the ESLint no undef warning is helpful for this.

---

Creation videos:

- writing the plugin: https://www.youtube.com/edit?ar=1&o=U&video_id=gNTejc1OLvU
- publishing plugin and macro: https://www.youtube.com/watch?v=rZxchMxj6KE

---

Codesandbox Demo: https://codesandbox.io/s/n5xp37z894

ASTExplorer histories and testing

- v0.09: switch to [no invocation needed](https://astexplorer.net/#/gist/ebdc9ffceac03882d325e601c28d87a8/56b1d719ab9b9c3e3cf31c473a83c0d5a68bba64)
- v0.08: [added ConcurrentMode and StrictMode](https://astexplorer.net/#/gist/ebdc9ffceac03882d325e601c28d87a8/c9f54d9fc16e347247dcc3426aa843b408a356dd)
- v0.07: https://astexplorer.net/#/gist/ebdc9ffceac03882d325e601c28d87a8/62d9235c51bd3586e35a8df8fa9f5f1f61eeb561
- v0.06: https://astexplorer.net/#/gist/ebdc9ffceac03882d325e601c28d87a8/795d0a75132ec44476b1f6cc2460f6147f43b65a
