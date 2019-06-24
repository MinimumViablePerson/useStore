# useStore

Get access to a global store with just hooks, no Redux or message passing.

## How to use

Copy [`useStore.js`](/useStore.js) into your project, then:

```js
import useStore from './useStore'

const App = props => {
  // you can set the initial state in the first call:
  const [count, setCount] = useStore('count', 0)
  
  return <h1>{count}</h1>
}

// then, in any other component, just retrieve the value from the store:

import useStore from './useStore'

const Counter = props => {
  const [count, setCount] = useStore('count')
  
  return <h1>{count}</h1>
}
```

Have fun!
