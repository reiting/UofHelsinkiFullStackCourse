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

module.exports = {
    dummy, totalLikes, favoriteBlog
}