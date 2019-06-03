import { useState, useEffect } from 'react'

// Doesnt work, will make it work
export const useTemporaryMessage = () => {
  const [messageTimer, setMessageTimer] = useState(null)
  const [message, setMessage] = useState('')

  const showErrorMessage = message => {
    messageTimer && clearTimeout(messageTimer)

    setMessage(message)
    setMessageTimer(setTimeout(() => setMessage(''), 5000))
  }

  const hideErrorMessage = () => {
    if (messageTimer) {
      clearTimeout(messageTimer)
      setMessage('')
    }
  }

  useEffect(() => {
    return () => {
      messageTimer && clearTimeout(messageTimer)
    }
  }, [])

  return [message, showErrorMessage, hideErrorMessage]
}
