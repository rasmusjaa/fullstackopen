import React from 'react'

const Filter = ({ setFilter }) => {
	const handleFilterChange = (event) => {
		setFilter(event.target.value)
	}

	return (
		<div>
			filter shown with <input onChange={handleFilterChange} />
		</div>
	)
}

export default Filter
