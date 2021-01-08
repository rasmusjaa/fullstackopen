import React, { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({ setUser, setMessage, setErrorMessage }) => {
	const [username, setUsername] = useState('') 
	const [password, setPassword] = useState('')

	const handleLogin = async (event) => {
		event.preventDefault()
		
		try {
			const user = await loginService.login({
				username, password,
			})
			window.localStorage.setItem(
				'loggedBlogappUser', JSON.stringify(user)
			)
			await blogService.setToken(user.token)
			setUser(user)
			setMessage(`${user.username} logged in`)
			setTimeout(() => {
				setMessage(null)
			}, 5000)
		} catch (exception) {
			setErrorMessage('Wrong credentials')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
	}

	return (
		<form onSubmit={handleLogin}>
			<div>
				username<br />
				<input
					type="text"
					value={username}
					name="Username"
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				password<br />
				<input
					type="password"
					value={password}
					name="Password"
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button type="submit">login</button>
		</form>
	)
}

export default LoginForm
