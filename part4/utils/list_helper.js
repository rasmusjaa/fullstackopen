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

module.exports = {
	totalLikes,
	favoriteBlog
}
