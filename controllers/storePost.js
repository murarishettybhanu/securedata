const Post = require('../database/models/Post')

module.exports = (req, res) => {
      Post.create({
        ...req.body,
        id: req.session.userId
      }, (error, post) => {
        res.redirect("/");
      });
}