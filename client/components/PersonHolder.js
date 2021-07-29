/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable react/button-has-type */
import React from 'react'
import personService from '../services/persons'

const PersonHolder = ({
  persons, setPerson, setPersons, setErrorMessage, setNotificationType,
}) => {
  if (!persons) return null

  console.log('persons', persons)

  return (
    <div>
      PersonHolder
    </div>
  )

  // return (
  //   persons.map((person) => (
  //     <p
  //       key={person.id}
  //     >
  //       {person.name}
  //       {' '}
  //       {person.number}
  //       {' '}
  //       <button
  //         key={person.id}
  //         onClick={() => {
  //           if (window.confirm(`Delete ${person.name} ?`)) {
  //             personService
  //               .deletePerson(person.id)
  //               .catch((error) => {
  //                 console.log('error', error)

  //                 setErrorMessage(`Information of ${person.name} has already been removed from server`)

  //                 console.log(typeof setErrorMessage)
  //                 setNotificationType('error')
  //               })

  //             const t = persons.filter((p) => p.id !== person.id)
  //             setPersons(t)
  //             const temp = <PersonHolder persons={t} setPerson={setPerson} setPersons={setPersons} />
  //             setPerson(temp)
  //           }
  //         }}
  //       >
  //         delete
  //       </button>
  //     </p>
  //   ))
  // )
}

export default PersonHolder
