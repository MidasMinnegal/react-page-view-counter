# React page view count
A page view counter for React based on the [Counter API](https://counterapi.dev/).

## Installation
Using NPM:
```
$ npm i --save react-page-view-count
```

## Usage
The package offers a React Hook, and a minimal react component.
### Hook
```js
import React from 'react'
import {usePageViewCounter} from 'react-page-view-count'

function HookExample() {
  
  // Call the hook with a settings object
  const [pageCount, loading] = usePageViewCounter({
    // when set to true every visitor will only be counted once.
    // NOT REQUIRED, DEFAULT = true
    onlyCountUniqueVisitors: false,
  })
  
  return (
    <div>
      Counted {loading ? 'Loading...' : pageCount} visitors
    </div>
  )
}

export default HookExample
```

### Component
```js
import React from 'react'
import PageViewCount from 'react-page-view-count'


function ComponentExample() {
  return (
    <div>
      Counted 
      <PageViewCounter loadingPlaceHolder="Loading.." />
      visitors
    </div>
  )
}

export default ComponentExample
```

## Customization
Both the hook and the component accept a settings object. This object is passed as the first variable to the hook. Defining settings is not required.

| Option                  | Description                                                           | Required | default             |
|:------------------------|:----------------------------------------------------------------------|----------|---------------------|
| customKey               | The key that the count will be stored on                              | No       | Generated from path |
| onlyCountUniqueVisitors | Count every visitors only once and saves a visit in the local storage | No       | true                |

The `PageViewCounter` component accepts the following props:

| Prop name           | Description                                                | Required | default          |
|:--------------------|:-----------------------------------------------------------|----------|------------------|
| Settings            | The previously mentioned settings object                   | No       | Default settings |
| loadingPlaceholder  | The placeholder text for when the count is loading         | No       | ''               |
| doneLoadingCallback | A callback that is called when the counter is done loading | No       | undefined        |

A fully customized example of the component:
```js
import React, {useCallback, useState} from 'react'
import PageViewCount from 'react-page-view-count'


function ComponentExample() {
  const [pageCountIsLoading, setPageCountIsLoading] = useState(true)

  // You should wrap the doneLoadingCallback in the useCallback wrapper 
  // to avoid it being called multiple times.
  const doneLoadingCallback = useCallback(() => {
    setPageCountIsLoading(false)
  }, [])
  
  return (
    <div>
      {loading && <div>Show something fancy whilst loading</div>}
      Counted
      <PageViewCounter 
        doneLoadingCallback={doneLoadingCallback} 
        loadingPlaceHolder="Loading.."
        settings={{
          onlyCountUniqueVisitors: false,
          customKey: 'myCustomKey'
        }}
      />
      visitors
    </div>
  )
}

export default ComponentExample
```
