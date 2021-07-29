/* eslint-disable react/destructuring-assignment */
import React from 'react'
import Header from './Header'
import Content from './Content'

const Course = (props) => (
  <div>
    <Header header={props.course.name} />
    <Content
      parts={props.course.parts}
    />
  </div>
)

export default Course
