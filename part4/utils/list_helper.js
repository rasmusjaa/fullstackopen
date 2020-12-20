var _ = require('lodash')

const totalLikes = (blogs) => {
	const reducer = (sum, item) => {
		return sum + item.likes
	}

	return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
	let max = -1
	let max_item = {
		title: '',
		author: '',
		likes: 0
	}

	for (let blog of blogs) {
		if (max < blog.likes) {
			max = blog.likes
			max_item.title = blog.title
			max_item.author = blog.author
			max_item.likes = blog.likes
		}
	}
	return max_item
}

const mostBlogs = (blogs) => {
	let max_item = {
		author: '',
		blogs: 0
	}

	const blogAmount = _.countBy(blogs, 'author')
	const blogAmountPairs = _.toPairs(blogAmount)
	const maxBlogs = _.maxBy(blogAmountPairs, _.last)

	if (maxBlogs && maxBlogs[1]) {
		max_item.author = maxBlogs[0]
		max_item.blogs = maxBlogs[1]
	}

	return max_item
}

const mostLikes = (blogs) => {
	let authorLikePairs = []
	let max_item = {
		author: '',
		likes: 0
	}

	const groupedByAuthor = _.groupBy(blogs, 'author')
	_.forEach(groupedByAuthor, function(author) {
		const reducer = (sum, item) => {
			return sum + item.likes
		}
		author.totalLikes = author.reduce(reducer, 0)
	})

	_.forOwn(groupedByAuthor, function(author, key) {
		authorLikePairs.push({ 'author': key, 'likes': author.totalLikes })
	})

	if (authorLikePairs.length > 0)
		max_item = _.maxBy(authorLikePairs, 'likes')

	return max_item
}

module.exports = {
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}
