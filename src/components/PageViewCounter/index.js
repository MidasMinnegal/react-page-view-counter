import React from 'react'
import usePageViewCounter from '../../hooks/usePageViewCounter'

function PageViewCounter() {
  const [count, isLoading] = usePageViewCounter()

  return isLoading ? '' : count
}

export default PageViewCounter
