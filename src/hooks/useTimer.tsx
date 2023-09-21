import { useState, useEffect, Dispatch, SetStateAction } from 'react'

interface ITimerProps {
  limit: number
}

interface IRetunType {
  counter: number
  setCounter: Dispatch<SetStateAction<number>>
}

const useTimer = ({ limit }: ITimerProps): IRetunType => {
  const [counter, setCounter] = useState<number>(limit)

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null
    if (counter > 0) {
      intervalId = setInterval(() => setCounter(counter - 1), 1000)
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [counter])

  return { counter, setCounter }
}

export default useTimer
