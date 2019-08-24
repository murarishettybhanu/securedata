const Post = require('../database/models/Post')

module.exports = async (req, res) => {
  const posts = await Post.find({id:req.session.userId}).sort({_id:-1});

  res.render("mydata", {
    posts
  });
}