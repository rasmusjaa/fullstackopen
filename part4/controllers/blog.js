const blogRouter = require('express').Router()
const Blog = require('../models/blogpost')

blogRouter.get('/', async (request, response) => {
	const blogposts = await Blog.find({})
	console.log(blogposts)
	response.json(blogposts)
})

blogRouter.post('/', async (request, response) => {
	const blog = new Blog(request.body)
	console.log(blog)

	const result = await blog.save()
	response.status(201).json(result)
})

blogRouter.delete('/:id', async (request, response) => {
	await Blog.findByIdAndRemove(request.params.id)
	response.status(204).end()
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
