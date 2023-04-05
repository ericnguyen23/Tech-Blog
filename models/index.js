const User = require("./User");
const BlogPost = require("./BlogPost");
const Comment = require("./Comment");

User.hasMany(BlogPost, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

BlogPost.belongsTo(User, {
  foreignKey: "user_id",
});

BlogPost.hasMany(Comment, {
  foreignKey: "comment_id",
});

Comment.belongsTo(BlogPost, {
  foreignKey: "blog_id",
});

module.exports = { User, BlogPost, Comment };
