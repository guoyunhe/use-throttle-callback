# @guoyunhe/use-throttle-callback

![Version](https://img.shields.io/npm/v/@guoyunhe/use-throttle-callback)
![Downloads](https://img.shields.io/npm/dw/@guoyunhe/use-throttle-callback)
![Bundle size](https://img.shields.io/bundlephobia/minzip/@guoyunhe/use-throttle-callback)

Throttle callbacks for React

## Install

```bash
npm i -S @guoyunhe/use-throttle-callback
```

## Example

Click the following button quickly!

```jsx
import { useState } from 'react';
import { useThrottleCallback } from '@guoyunhe/use-throttle-callback';

function App() {
  const [count, setCount] = useState(0);

  const add = useThrottleCallback(
    () => {
      setCount((prev) => prev + 1);
    },
    // throttle for 5 seconds
    5000,
  );

  return (
    <div>
      <button onClick={add}>Pay</button>
      <p>You have paid {count} times</p>
    </div>
  );
}
```

## API

### useThrottleCallback(callback: Function, timeout?: number): Function

#### callback: Function

Callback function

#### timeout?: number

Timeout in ms

Default: 500(ms)

## FAQ

### Why not use React state to disable buttons?

React state changes will only take effect in next render, which may take 50ms or more in worst cases.
However, the time interval between two mouse clicks can be only 20ms. This means, button disabled
state change is too late to block the second click event.

It is helpful to add disabled or loading state for better visual feedback. But keep in mind that is
not a reliable way of throttling.

### Can we use DOM operation to disable the button immediately?

Yes, but here are some problems:

1. It is not the React style of doing things.
2. `<a>` and `<div>` elements don't support `disabled`.
3. `<form onSubmit>` can be triggered by any `<input>` and `<button>` within.
