const commentHandler = async (event) => {
  event.preventDefault();

  const comment = document.querySelector("#comment").value.trim();
  const blog_id = window.location.href.split("/").pop();

  if (comment) {
    const response = await fetch(`/api/comments`, {
      method: "POST",
      body: JSON.stringify({ comment, blog_id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to create a commnet");
    }
  }
};

document
  .querySelector(".comment-form")
  .addEventListener("submit", commentHandler);
