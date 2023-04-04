const User = require("./User");
const BlogPost = require("./BlogPost");
const Comment = require("./Comment");

User.hasMany(BlogPost, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// User.hasMany(Comment, {
//   foreignKey: "user_id",
//   onDelete: "CASCADE",
// });

BlogPost.belongsTo(User, {
  foreignKey: "user_id",
});

BlogPost.hasMany(Comment, {
  foreignKey: "comment_id",
});

// BlogPost.belongsTo(Comment, {
//   foreignKey: "comment_id",
// });

// Comment.belongsTo(User, {
//   foreignKey: "user_id",
// });

Comment.belongsTo(BlogPost, {
  foreignKey: "comment_id",
});

module.exports = { User, BlogPost, Comment };
