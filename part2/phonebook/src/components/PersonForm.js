import React, { useState } from 'react'
import phonebookService from './../services/phonebook'

const containsKeyValue = (arr, key, value) => {
	const needle = value.toLowerCase()
	const found = arr.find((haystack) => {
		return (haystack[key].toLowerCase() === needle)
	})
	return typeof found !== 'undefined'
}

const PersonForm = ({ persons, setPersons, setNotification }) => {
	const [ newName, setNewName ] = useState('')
	const [ newNumber, setNewNumber ] = useState('')

	const addPerson = (event) => {
		event.preventDefault()
		if (newName === '' || newNumber === '')
			return
		else if (containsKeyValue(persons, 'number', newNumber)) {
				alert(`Number ${newNumber} is already added to phonebook`)
		} else if (containsKeyValue(persons, 'name', newName)) {
			const found = persons.find(n => n.name === newName)
			if (window.confirm(found.name + ' already exists, update number?'))
			{
				const changed = { ...found, number: newNumber}
				phonebookService
					.update(found.id, changed)
					.then(returnedPerson => {
						setPersons(persons.map(person => person.id !== found.id ? person : returnedPerson))
						setNewName('')
						setNewNumber('')
					})
					.catch(error => {
						setNotification({
							"message": `Error: ${error.response.data.error}`,
							"type": "error"
						})
						setTimeout(() => {
							setNotification(null)
						}, 5000)
						console.log(error.response.data)
					})
			}
		} else {
			const person = { name: newName, number: newNumber }
			phonebookService
				.create(person)
				.then(returnedPerson => {
					setPersons(persons.concat(returnedPerson))
					setNewName('')
					setNewNumber('')
					setNotification({
						"message": `Added ${returnedPerson.name}`,
						"type": "notification"
					})
					setTimeout(() => {
						setNotification(null)
					}, 5000)
				})
				.catch(error => {
					setNotification({
						"message": `Error: ${error.response.data.error}`,
						"type": "error"
					})
					setTimeout(() => {
						setNotification(null)
					}, 5000)
					console.log(error.response.data)
				})
		}
	}

	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value)
	}

	return (
		<form onSubmit={addPerson}>
				<div>
					name: <input value={newName} onChange={handleNameChange} />
				</div>
				<div>
					number: <input value={newNumber} onChange={handleNumberChange}  />
					</div>
				<div>
					<button type="submit">add</button>
				</div>
		</form>
	)
}

export default PersonForm
