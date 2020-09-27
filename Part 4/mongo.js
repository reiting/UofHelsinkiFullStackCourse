const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const mongoUrl =
"mongodb+srv://reiting:IZMwQJa7iebwtAla@cluster0.f5c80.mongodb.net/blog-app?retryWrites=true&w=majority"

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes:  {
     type: Number,
     default: 0
    }
  })

  const Blog = mongoose.model('Blog', blogSchema)

//   blog.save().then(response => {
//     console.log(`added ${person.name} number ${person.number} to phonebook`)
//     mongoose.connection.close()
//   })
  Blog.find({}).then(result => {
    result.forEach(blog => {
        console.log(blog)
    })
    mongoose.connection.close()
  })
//}