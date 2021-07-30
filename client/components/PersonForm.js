import React from 'react'

const PersonForm = ({
  newName, newNumber, handlePersonChange, handleNumberChange, addNote,
}) => (
  <div>
    <form onSubmit={addNote}>
      <div>
        name:
        {' '}
        <input
          value={newName}
          onChange={handlePersonChange}
        />
      </div>
      <div>
        number:
        {' '}
        <input
          value={newNumber}
          onChange={handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </div>
)

export default PersonForm
