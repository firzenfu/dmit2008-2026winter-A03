# useEffect explanation

`useEffect` is another built-in React hook.

> 'hook' -> hooking some automated behaviour into React core logic.
> for example, `useState` registers state values *outside* components, and reinjects them when the component re-renders; that's how those values persist.

`useEffect` is a hook that is (when used responsibly) meant to connect React behaviour to some sort of external system, e.g. a REST API.

The goals here are:

- we want some sort of behaviour external to React to fire when things internal to React happen (e.g. page loads, a state/prop value change, component re-renders, etc.)

- we want all our core React rendering (components w/ state & props) to happen *before* side-effected behaviour.

---

## what is "side-effecting"?

Simple explanation: when logic mutates something outside its own scope.

Here, there is no side-effecting: the function takes an input, returns an output, doesn't change anything outside its own scope.

```js
function double(n) {
	return 2 * n
}
```

In this version, there *is* side-effecting:

```js
let num; // outside the scope of double()

function double(n) {
	num = 2 * n
	return num
	// or even, return 2 * n -> I've still mutated something outside of scope
}

```

Front-end-specific examples of side-effecting include getting/posting to a REST API, making a websocket connection to a chat server, writing/reading to browser local storage, etc.


---

## side-effecting in React: `useEffect`

In the case of React, you can imagine some external system (like a REST API, or a websocket server) as the thing outside of scope (like `num` in the example above), whereas React 'pure rendering' (components, props, and state) is like the `function` above.

So, in React, side-effecting means any I/O with an external system, which should happen *after* React's pure rendering.

`useEffect` thus gives us two main advantages:

- delay side-effecting behaviour until after pure rendering (e.g. we don't have control over that external system — whether it's offline, slow, etc.)

- automatically trigger re-rendering based on communication with an external system (like REST API), i.e. *hook into* things like React state & props, to fire that side-effecting behaviour.

---

## how does `useEffect` work?

```jsx
function someComponent() {
	
	// ...


	useEffect(
		// param 1: the logic that should fire, as a callback function
		() => { /* stuff happens here */ },

		// param 2: the dependency array — what controls this effect re-firing
		[]
	)

}
```

^ In this case, the effect will only fire upon component mounting. Why? Because of the dependency array.

```jsx
function someComponent() {
	
	// ...


	useEffect(
		() => { /* stuff happens here */ },  // param 1: callback
		[]                                   // param 2: dependency array

		/* The dependency array can be one of three things:

		   1. missing entirely (no 2nd argument):   effect will re-fire *anytime* component re-renders (don't do this)
		   2.  []       (empty dependency array):   effect will fire only when component mounts, never re-fire
		   3.  [state, props]   inside the array:   effect will re-fire anytime that state variable/prop changes
		*/
	)

}
````

Again, the idea of a 'hook': "I want to e.g. read from / write to a REST API for component/UI data, and I want to connect that to what's happening in React so re-rendering can be automated" — *hooking into* events like when the page loads, when a stateful value / component prop changes, etc.

```jsx
function someComponent(someProp) {
	
	// ...


	useEffect(

		// The callback contains the logic that fires with the effect,
		// but if the effect *returns* anything, that is 'cleanup' logic
		// that runs before the effect re-fires.

		() => { // param 1: callback

			// 1a) setup logic
			console.log("here's my setup logic") // runs on intial fire, and on re-fire w/ new state & props after cleanup

			// 1b) cleanup logic (optional)
			return () => {
				console.log("here's my cleanup/teardown logic") // when effect re-fires, this runs first w/ old state & props
			}
		},  

		[someProp]  // param 2: dependency array
	)

}
```

If `useEffect`'s callback returns an inner function, then if the effect ever re-fires, the cleanup code will run first, with old state & props, *then* the main / 'setup' logic will run with new state & props.

Looking at the [chatroom example](https://react.dev/reference/react/useEffect#usage) (great explanation in here) from React docs:

```jsx
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';  // some external function


function ChatRoom({ roomId }) {

  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useEffect(

  	// param 1: our callback function; what actually fires
  	() => {

  		// 1a) 'setup' logic; fires for the effect (if re-firing, w/ new state & props)
	  	const connection = createConnection(serverUrl, roomId);
	    connection.connect();

	    // 1b) 'cleanup' logic; if effect re-fires, fire first w/ old state & props
	  	return () => {
	      connection.disconnect();

  	};
  },

  [serverUrl, roomId]);
  
}
```

^ So in this example, when the `ChatRoom` component mounts, the setup logic fires (same as with a dependency array of `[]`).

If `serverUrl` or `roomId` ever change, the effect's cleanup logic fires *first* w/ old URL & room ID (to disconnect from them), and then the setup logic fires w/ new URL & room ID (to create connections to them).

So basically, we use `useEffect` to a) synchronise React-internal changes to external systems, and b) make sure that interaction w/ external systems happens after internal rendering.
