const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const mongoUrl =
  `mongodb+srv://fullstack:${password}@cluster0-ostce.mongodb.net/phonebook?retryWrites=true`

  mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })

  const Blog = mongoose.model('Blog', blogSchema)

// if (process.argv.length > 4) {
//   const title = process.argv[3]
//   const author = process.argv[4]
//   const url = new Person({ name, number })
//   const likes = 
  
//   person.save().then(response => {
//     console.log(`added ${person.name} number ${person.number} to phonebook`)
//     mongoose.connection.close()
//   })
// } else {
  Blog.find({}).then(result => {
    console.log('blog:')
    result.forEach(blog => {
        console.log(blog.title, blog.author)
    })
    mongoose.connection.close()
  })
//}