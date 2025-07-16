document.getElementById("contactForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  try {
    const response = await axios.post("/api/cloud/submitForm", { name, email });

    let message;
    if (typeof response.data === "string") {
      // If server returned a plain string
      message = response.data;
    } else {
      // If server returned a JSON object with a message property
      message = response.data.message || "Submission successful";
    }

    document.getElementById("message").innerText = `✅ ${message}`;
    document.getElementById("contactForm").reset(); // Clear form after success
  } catch (err) {
    console.error("Form submission error:", err);
    document.getElementById("message").innerText = "❌ Submission failed. Please try again.";
  }
});
