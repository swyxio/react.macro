# babel plugin/macro for react globals

> react plugin and macro that lets you write the React APIs as if they were all globals

This:

```js
import { macro } from 'react.macro'; //optional if not using babel macro
macro(); //optional if not using babel macro

export default function Timer() {
  const [state, setState] = useState(0);
  const myRef = React.useRef(0);
  return <Suspense>{state}</Suspense>;
}
```

Translates to:

```js
import React from 'react'; // added if absent, not duplicated if present
export default function Timer() {
  const [state, setState] = React.useState(0);
  const myRef = React.useRef(0);
  return <React.Suspense>{state}</React.Suspense>;
}
```

---

Creation videos:

- writing the plugin: https://www.youtube.com/edit?ar=1&o=U&video_id=gNTejc1OLvU
- publishing plugin and macro: https://www.youtube.com/watch?v=rZxchMxj6KE

---

ASTExplorer histories and testing

- v0.07: https://astexplorer.net/#/gist/ebdc9ffceac03882d325e601c28d87a8/62d9235c51bd3586e35a8df8fa9f5f1f61eeb561
- v0.06: https://astexplorer.net/#/gist/ebdc9ffceac03882d325e601c28d87a8/795d0a75132ec44476b1f6cc2460f6147f43b65a
