import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [message, setMessage] = useState(null)
	const [errorMessage, setErrorMessage] = useState(null)
	const [user, setUser] = useState(null)

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs( blogs )
		)  
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const handleLogOut = async (event) => {
		event.preventDefault()
		window.localStorage.removeItem('loggedBlogappUser')
		blogService.removeToken()
		setUser(null)
		setMessage('logged out')
		setTimeout(() => {
			setMessage(null)
		}, 5000)
	}

	const notLoggedIn = () => {
		return (
			<div>
				<h2>Log in to application</h2>
				<Notification message={message} errorMessage={errorMessage} />
				<LoginForm setUser={setUser} setMessage={setMessage} setErrorMessage={setErrorMessage} />
			</div>
		)
	}

	const loggedIn = () => {
		return (
			<div>
				<h2>blogs</h2>
				<Notification message={message} errorMessage={errorMessage} />
				<button onClick={handleLogOut}>log out</button>
				<BlogForm blogs={blogs} setBlogs={setBlogs} setMessage={setMessage} setErrorMessage={setErrorMessage} />
				{blogs.map(blog =>
					<Blog key={blog.id} blog={blog} />
				)}
			</div>
		)
	}

	return (
		<div>
			{user === null ?
				notLoggedIn() :
				loggedIn()
			}
		</div>
	)
}

export default App
