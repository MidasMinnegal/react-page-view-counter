import { useEffect, useState } from 'react'
import { CounterAPI } from 'counterapi'

export default function usePageViewCounter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const counter = new CounterAPI()

    const fetchData = async () => {
      const { Count: newCount } = await counter.up('test', 'test')
      setCount(newCount)
    }

    fetchData()
  }, [])

  return count
}
