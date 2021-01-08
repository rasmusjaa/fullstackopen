import React from 'react'

const Notification = ({ message, errorMessage }) => {
	if (message === null && errorMessage === null) {
		return null
	}
	
	return (
		<div className={`notification ${errorMessage ? 'error' : ''}`}>
			{errorMessage ? errorMessage : message}
		</div>
	)
}

export default Notification
