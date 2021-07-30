/* eslint-disable prefer-const */
/* eslint-disable no-console */
/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react'
// import axios from 'axios'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import PersonHolder from './components/PersonHolder'
import Notification from './components/Notification'
// import './index.css'

const App = () => {
  const [persons, setPersons] = useState(null)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [person, setPerson] = useState(null)

  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  // eslint-disable-next-line consistent-return
  const addNote = (e) => {
    const name = persons.map((person) => person.name)
    const number = persons.map((person) => person.number)

    e.preventDefault()

    if (number.includes(newNumber)) {
      alert(`${newNumber} is already exist.`)
      return false
    }

    if (name.includes(newName)) {
      const person = persons.find((person) => person.name === newName)
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)) {
        // console.log("newName", newName)
        // console.log("person", person)

        const newObject = {
          ...person,
          number: newNumber,
        }

        // console.log("newNumber", newNumber)
        // console.log("newObject", newObject)

        personService
          .updatePhoneNumber(person.id, newObject)
          .then()

        const t = persons.filter((p) => p.id !== person.id).concat(newObject)
        // console.log('t', t)

        setPersons(t)
        const temp = (
          <PersonHolder
            persons={t}
            setPerson={setPerson}
            setPersons={setPersons}
            setErrorMessage={setErrorMessage}
            setNotificationType={setNotificationType}
          />
        )
        setPerson(temp)

        setNewName('')
        setNewNumber('')
      }
    } else {
      const newObject = {
        id: persons.length + 1,
        name: newName,
        number: newNumber,
      }

      personService
        .create(newObject)
        .then((createdPerson) => {
          setPersons(persons.concat(newObject))
          const temp = (
            <PersonHolder
              persons={persons.concat(newObject)}
              setPerson={setPerson}
              setPersons={setPersons}
              setErrorMessage={setErrorMessage}
              setNotificationType={setNotificationType}
            />
          )

          setErrorMessage(`Added ${newName}`)
          setNotificationType('added')
          setTimeout(() => {
            setErrorMessage(null)
          }, 2000)

          setPerson(temp)
          setNewName('')
          setNewNumber('')

          console.log('createdPerson', createdPerson)
        })
        .catch((error) => {
          console.log('typeof error', error)
          console.log('typeof error.response.data.error', error.response.data.error)
          setErrorMessage(error.response.data.error)
          setNotificationType('error')
          setNewName('')
          setNewNumber('')

          // console.log(error.response.data);
        })

      // setPersons(persons.concat(newObject))

      // console.log("persons", persons);
      // console.log('persons.concat(newObject)', persons.concat(newObject))

      // let temp = <PersonHolder
      //   persons={persons.concat(newObject)}
      //   setPerson={setPerson}
      //   setPersons={setPersons}
      //   setErrorMessage={setErrorMessage}
      //   setNotificationType={setNotificationType}
      // />

      // setErrorMessage(`Added ${newName}`)
      // setNotificationType("added")
      // setTimeout(() => {
      //   setErrorMessage(null)

      // }, 2000)

      // setPerson(temp)
      // setNewName("")
      // setNewNumber("")
    }
  }

  const handlePersonChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilterChange = (e) => {
    setPerson(() => persons.filter(
      (person) => (
        person.name.toUpperCase().indexOf(e.target.value.toUpperCase()) > -1),
    )
      .map(
        (filteredName) => (

          <PersonHolder
            key={filteredName.id}
            persons={[filteredName]}
            setPerson={setPerson}
            setPersons={setPersons}
            setErrorMessage={setErrorMessage}
            setNotificationType={setNotificationType}
          />

        ),
      ))
    setFilter(e.target.value)
  }

  useEffect(() => {
    personService
      .getAll()
      .then((persons) => {
        setPersons(persons)

        let temp
        temp = (
          <PersonHolder
            persons={persons}
            setPerson={setPerson}
            setPersons={setPersons}
            setErrorMessage={setErrorMessage}
            setNotificationType={setNotificationType}
          />
        )

        // console.log('temp personService.getAll()', temp)

        setPerson(temp)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} type={notificationType} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h3>add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handlePersonChange={handlePersonChange}
        handleNumberChange={handleNumberChange}
        addNote={addNote}
      />

      <h3>Numbers</h3>
      <Persons
        person={person}
      />
    </div>
  )
}

export default App
