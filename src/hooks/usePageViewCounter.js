import { useEffect, useState } from 'react'
import { CounterAPI } from 'counterapi'

const LOCALHOST_STORAGE_KEY = 'react-page-view-counter-localhost-id'
const KEY_PREFIX = 'reactPageViewCounter'

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

export default function usePageViewCounter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const counter = new CounterAPI()

    if (!window) return

    const host = getHost()
    const path = window.location.pathname
    const key = removeSpecialCharactersFromString(`${KEY_PREFIX}${host}${path}`)

    const fetchData = async () => {
      const { Count: newCount } = await counter.up(host, key)
      setCount(newCount)
    }

    fetchData()
  }, [])

  return count
}
