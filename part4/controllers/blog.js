const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blogpost')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
	const blogposts = await Blog
		.find({})
		.populate('user', { username: 1, name: 1, id: 1 })
	console.log(blogposts)
	response.json(blogposts)
})

blogRouter.post('/', async (request, response) => {
	const body = request.body
	const decodedToken = jwt.verify(request.token, process.env.SECRET)
	if (!decodedToken || !decodedToken.id) {
		return response.status(401).json({ error: 'token missing or invalid' })
	}
	const user = await User.findById(decodedToken.id)

	const blog = new Blog({
		title: body.title,
		author: body.author,
		user: user._id,
		url: body.url,
		likes: body.likes
	})

	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()
	response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
	const decodedToken = jwt.verify(request.token, process.env.SECRET)
	if (!decodedToken || !decodedToken.id) {
		return response.status(401).json({ error: 'token missing or invalid' })
	}
	const blogToRemove = await Blog.findById(request.params.id)
	if (!blogToRemove)
		return response.status(204).end()
	if (blogToRemove.user.toString() !== decodedToken.id)
		return response.status(401).json({ error: 'delete not authorized' })
	await Blog.deleteOne({ _id: request.params.id })
	return response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
	const body = request.body

	const blog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes
	}

	const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
	response.status(200).json(result)
})

module.exports = blogRouter
