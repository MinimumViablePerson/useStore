import { useState, useEffect } from 'react'

// HOW TO USE:
// useStore('key', ?initialStateForThisKey)

let store = {}
const listeners = {}

const setStateForKey = key => newState => {
  // don't do anything if there is no new state provided
  if (newState !== undefined) {
    // update the store with the new state for the given key
    store = { ...store, [key]: newState }
    listeners[key] = listeners[key] || []
  }

  // all all the listeners for this key to re-render dependent components
  listeners[key].forEach(listener => listener({}))
}

const useStore = (key, initialState) => {
  // add the new key with its initial state if it doesn't exist already
  if (store[key] === undefined) {
    store = { ...store, [key]: initialState }
  }

  // create a new listener to trigger this component's re-render
  const newListener = useState()[1]

  useEffect(() => {
    // push the listener to the list of listeners for this key
    listeners[key] = listeners[key] || []
    listeners[key].push(newListener)

    // remove the listener for this component when unmounted
    return () => { listeners = listeners.filter(listener => listener !== newListener) }
  }, [])

  return [store[key], setStateForKey(key)]
}

export default useStore
