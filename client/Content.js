/* eslint-disable react/destructuring-assignment */
import React from 'react'
import Sum from './Sum'

const Content = (props) => {
  // console.log('Content', props)

  const part = props.parts.map((part) => (
    <p key={part.id}>
      {part.name}
      {' '}
      {part.exercises}
    </p>
  ))

  return (
    <div>
      {part}
      <Sum exercises={props.parts.map((part) => part.exercises)} />
    </div>

  )
}

export default Content
