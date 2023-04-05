const router = require("express").Router();
const { User, BlogPost, Comment } = require("../models");
const withAuth = require("../utils/auth");

// home route
router.get("/", async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const blogData = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = blogData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get("/commentspage", async (req, res) => {
//   try {
//     // Get all projects and JOIN with user data
//     const commentData = await Comment.findAll({
//       include: [
//         {
//           model: BlogPost,
//           attributes: ["title"],
//         },
//       ],
//     });

//     // Serialize data so the template can read it
//     const comments = commentData.map((post) => post.get({ plain: true }));

//     // Pass serialized data and session flag into template
//     res.render("comments", {
//       comments,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get("/comments", async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const commentData = await Comment.findAll({
      include: [
        {
          model: BlogPost,
        },
      ],
    });

    // Serialize data so the template can read it
    const comments = commentData.map((comment) => comment.get({ plain: true }));
    // Pass serialized data and session flag into template
    res.render("comments", {
      comments,
      // logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Single blog post route
router.get("/post/:id", async (req, res) => {
  try {
    // gets blog post data with User info
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
        },
      ],
    });
    const blogPost = blogPostData.get({ plain: true });
    // get all comments and include BlogPost
    const commentData = await Comment.findAll({
      include: [
        {
          model: BlogPost,
        },
      ],
    });
    const comments = commentData.map((comment) => comment.get({ plain: true }));

    const filteredComments = comments.filter(
      (comment) => comment.blog_id === blogPost.id
    );

    // render to hanlebar's post template
    res.render("post", {
      // spread all blogPosts vars
      ...blogPost,
      // pass in comments
      filteredComments,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("signup");
});

// Use withAuth middleware to prevent access to route
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: BlogPost }],
    });

    const user = userData.get({ plain: true });
    // render user information in handlebar's profile tempalte
    res.render("dashboard", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get("/profile", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      // include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });
    // render user information in handlebar's profile tempalte
    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

module.exports = router;
