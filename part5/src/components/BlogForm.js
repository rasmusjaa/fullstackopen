import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ blogs, setBlogs, setMessage, setErrorMessage }) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const addBlog = async (event) => {
		event.preventDefault()
		const blogObject = {
			title: title,
			author: author,
			url: url
		}

		try {
			const returnedBlog = await blogService.create(blogObject)
			setBlogs(blogs.concat(returnedBlog))
			setTitle('')
			setAuthor('')
			setUrl('')
			setMessage(`A new blog "${title}" by ${author} added`)
			setTimeout(() => {
				setMessage(null)
			}, 5000)
		} catch (exception) {
			setErrorMessage('Adding blog failed, make sure that title, author and url are filled')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}

	}

	return (
		<div>
			<h3>Add blog</h3>
			<form onSubmit={addBlog}>
				title<br />
				<input
					value={title}
					onChange={({ target }) => setTitle(target.value)}
				/><br />
				author<br />
				<input
					value={author}
					onChange={({ target }) => setAuthor(target.value)}
				/><br />
				url<br />
				<input
					value={url}
					onChange={({ target }) => setUrl(target.value)}
				/><br />
				<button type="submit">save</button>
			</form>
		</div>
	)
}

export default BlogForm
