const dummy = (blogs) => {
   return 1
}

const totalLikes = blogs => {
    return blogs.reduce((acc, blog) => {
        return acc + blog.likes;
      }, 0);
}

const favoriteBlog = blogs => {
    if(!blogs) return null;

    const mostLiked = blogs.reduce((blog, max) => {
        blog.likes > max.likes ? blog : max
    })

    return {
        title: mostLiked.title,
        author: mostLiked.author,
        likes: mostLiked.likes
    }
}

module.exports = {
    dummy, totalLikes, favoriteBlog
}