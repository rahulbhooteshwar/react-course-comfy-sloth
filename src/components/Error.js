import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
const Error = () => {
  const [errorTimeout, setErrorTimeout] = useState(5)
  const history = useHistory()
  useEffect(() => {
    if (errorTimeout === 0) {
      history.push('/')
    }
  }, [errorTimeout, history])
  useEffect(() => {
    const interval = setInterval(() => {
      setErrorTimeout((current) => {
        return current - 1
      })
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])
  return <div className="section section-center text-center">
    <h2>There was an error!</h2>
    <h4>Redirecting in <strong>{errorTimeout}</strong> seconds...</h4>
  </div>
}

export default Error
