import React from 'react'

const searchKeyValue = (arr, key, value) => {
	const needle = value.toLowerCase()
	const filtered = arr.filter((haystack) => haystack[key].toLowerCase().includes(needle))
	return filtered
}

const Filter = ({countries, setCopyCountries}) => {
	const handleFilterChange = (event) => {
		const copy = searchKeyValue(countries, 'name', event.target.value)
		setCopyCountries(copy)
	}

	return (
		<div>
			find countries <input onChange={handleFilterChange} />
		</div>
	)
}

export default Filter
