import { useEffect, useState } from 'react'
import { CounterAPI } from 'counterapi'

const LOCALHOST_STORAGE_KEY = 'react-page-view-counter-localhost-id'
const VISITED_STORAGE_KEY = 'react-page-view-counter-visited'

const KEY_PREFIX = 'reactPageViewCounter'
const ERROR_PREFIX = '[ERROR][react-page-view-count]'

const getLocalHostStorageId = () => {
  const localStorageHostId = localStorage.getItem(LOCALHOST_STORAGE_KEY)
  if (localStorageHostId) return localStorageHostId

  const newLocalStorageId = new Date().getTime().toString()
  localStorage.setItem(LOCALHOST_STORAGE_KEY, newLocalStorageId)

  return newLocalStorageId
}

const getHost = () => {
  const { hostname, host } = window.location
  // All developers develop on localhost, so if this is the case, we generate a unique id for
  // the device and store it in the localstorage to make it persistent and use it as the host
  // instead. This gives every developer his/her own timer instance.
  if (hostname === 'localhost' || hostname === '127.0.0.1') return getLocalHostStorageId()
  return host
}

const removeSpecialCharactersFromString = (string) => string.replace(/[^a-zA-Z0-9]/g, '')

const defaultSettings = {
  onlyCountUniqueVisitors: true,
}

const extractPropsFromSettings = (settings) => ({
  customKey: settings?.customKey,
  onlyCountUniqueVisitors: typeof settings?.onlyCountUniqueVisitors === 'boolean'
    ? settings.onlyCountUniqueVisitors : defaultSettings.onlyCountUniqueVisitors,
})

export default function usePageViewCounter(
  settings,
) {
  const { customKey, onlyCountUniqueVisitors } = extractPropsFromSettings(settings)

  const [count, setCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const counter = new CounterAPI()

    const host = getHost()
    const path = window?.location.pathname
    const key = customKey
      ? removeSpecialCharactersFromString(customKey)
      : removeSpecialCharactersFromString(`${KEY_PREFIX}${host}${path}`)

    const visitedKeys = JSON.parse(localStorage.getItem(VISITED_STORAGE_KEY)) || []
    const hasVisited = visitedKeys.includes(key)

    const fetchAndIncrementCount = async () => {
      try {
        const { Count: newCount } = await counter.up(host, key)
        localStorage.setItem(VISITED_STORAGE_KEY, JSON.stringify([...visitedKeys, key]))
        setCount(newCount)
      } catch (e) {
        console.error(ERROR_PREFIX, e)
      }

      setIsLoading(false)
    }

    const fetchCount = async () => {
      try {
        const { Count: newCount } = await counter.get(host, key)
        setCount(newCount)
      } catch (e) {
        console.error(ERROR_PREFIX, e)
      }

      setIsLoading(false)
    }

    if (!hasVisited || !onlyCountUniqueVisitors) fetchAndIncrementCount()
    else fetchCount()
  }, [customKey, onlyCountUniqueVisitors])

  return [count, isLoading]
}
