import React from 'react'

export default function Notification({ message, type }) {
  if (message === null) {
    return null
  }

  return (
    <div className={type}>
      {message}
    </div>
  )
}
