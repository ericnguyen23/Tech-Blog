const commentHandler = async (event) => {
  event.preventDefault();

  const comment = document.querySelector("#comment").value.trim();

  if (comment) {
    const response = await fetch(`/api/comments`, {
      method: "POST",
      body: JSON.stringify({ comment }),
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
