const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#blog-title").value.trim();
  const blogBody = document.querySelector("#blog-body").value.trim();

  if (title && blogBody) {
    const response = await fetch(`/api/blogposts`, {
      method: "POST",
      body: JSON.stringify({ title, blogBody }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to create blog post");
    }
  }
};

document
  .querySelector(".new-blog-form")
  .addEventListener("submit", newFormHandler);
