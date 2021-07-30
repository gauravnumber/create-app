/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react'

const Filter = ({ filter, handleFilterChange }) => (
  <div>
    filter shown with
    {' '}
    <input value={filter} onChange={handleFilterChange} autoFocus />
  </div>
)

export default Filter
