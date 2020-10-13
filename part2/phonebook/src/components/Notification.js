import React from 'react'

const Notification = ({ notification }) => {
	if (notification === null) {
		return null
	}
	if (notification.type === 'notification') {
		return (
			<div className="notification">
				{notification.message}
			</div>
		)
	}
	if (notification.type === 'error') {
		return (
			<div className="error">
				{notification.message}
			</div>
		)
	}
}

export default Notification
