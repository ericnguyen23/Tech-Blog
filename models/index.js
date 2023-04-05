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

// BlogPost.hasMany(Comment, {
//   foreignKey: "comment_id",
// });

BlogPost.belongsToMany(User, {
  through: Comment,
  foreignKey: "blog_id",
});

// Comment.belongsTo(BlogPost, {
//   foreignKey: "comment_id",
// });

module.exports = { User, BlogPost, Comment };
