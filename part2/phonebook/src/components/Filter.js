import React from 'react'

const searchKeyValue = (arr, key, value) => {
	const needle = value.toLowerCase()
	const filtered = arr.filter((haystack) => haystack[key].toLowerCase().includes(needle))
	return filtered
}

const Filter = ({persons, setCopyPersons}) => {
	const handleFilterChange = (event) => {
		const copy = searchKeyValue(persons, 'name', event.target.value)
		setCopyPersons(copy)
	}

	return (
		<div>
			filter shown with <input onChange={handleFilterChange} />
		</div>
	)
}

export default Filter
