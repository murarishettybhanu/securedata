const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  id: String,
  date: {
    type: Date,
    default: new Date()
  },
  data: String
})

const Post = mongoose.model('Post', PostSchema)

module.exports = Post
