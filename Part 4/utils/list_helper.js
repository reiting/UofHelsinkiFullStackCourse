const dummy = (blogs) => {
    return 1
}

const totalLikes = blogs => {
    return blogs.reduce((acc, blog) => {
        return acc + blog.likes;
    }, 0);
}

const favoriteBlog = blogs => {
    if (!blogs || blogs.length === 0) return null;

    const mostLiked = blogs.reduce((prev, current) =>
        prev.likes > current.likes ? prev : current,
    )

    return {
        title: mostLiked.title,
        author: mostLiked.author,
        likes: mostLiked.likes
    }
}

const mostBlogs = (blogs) => {
    // Get all blog authors
    const authors = blogs.map((blog) => blog.author)
  
    if (!authors || authors.length === 0) {
      return null
    }
  
    // Count blogs by author
    const countBlogsByAuthor = authors.reduce((acc, curr) => {
      acc[curr] ? acc[curr]++ : (acc[curr] = 1)
  
      return acc
    }, {})
  
    // Return array with name of author with most blogs and amount of blogs.
    const authorWithMostBlogsArray = Object.entries(
      countBlogsByAuthor,
    ).reduce((a, b) => (countBlogsByAuthor[a] > countBlogsByAuthor[b] ? a : b))
  
    const authorWithMostBlogs = {
      author: authorWithMostBlogsArray[0],
      blogs: authorWithMostBlogsArray[1],
    }
  
    return authorWithMostBlogs
  }
  
  const mostLikes = (blogs) => {
    if (blogs.length === 0) {
      return null
    }
  
    // Get all of the blog authors
    const authors = blogs.map((blog) => blog.author)
  
    // filter out doubles
    let uniqueAuthors = [...new Set(authors)]
  
    const likesByAuthor = uniqueAuthors.map((author) => {
      // Get the blogs for each author
      const blogsByAuthor = blogs.filter((blog) => blog.author === author)
  
      // Count the total amount of likes by author
      const countLikesPerAuthor = blogsByAuthor.reduce(
        (accumulator, currentValue) => accumulator + currentValue.likes,
        0,
      )
  
      // Create an object to return author + total amount of it's likes.
      const amountOfLikesByAuthor = {
        author: author,
        likes: countLikesPerAuthor,
      }
  
      return amountOfLikesByAuthor
    })

    return likesByAuthor.reduce((a, b) => (a.likes > b.likes ? a : b))
  }

module.exports = {
    dummy, totalLikes, favoriteBlog, mostLikes, mostBlogs
}