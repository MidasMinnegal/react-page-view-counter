import { useEffect } from 'react'
import PropTypes from 'prop-types'
import usePageViewCounter from '../../hooks/usePageViewCounter'

function PageViewCounter({ doneLoadingCallback, loadingPlaceholder = '', settings = {} }) {
  const [count, isLoading] = usePageViewCounter(settings)

  useEffect(() => {
    if (!isLoading && doneLoadingCallback) doneLoadingCallback()
  }, [isLoading, doneLoadingCallback])

  return isLoading ? loadingPlaceholder : count
}

PageViewCounter.propTypes = {
  doneLoadingCallback: PropTypes.func,
  loadingPlaceHolder: PropTypes.string,
  settings: PropTypes.shape({
    customKey: PropTypes.string,
    onlyCountUniqueVisitors: PropTypes.bool,
  }),
}

export default PageViewCounter
