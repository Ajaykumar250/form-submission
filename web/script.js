document.getElementById("contactForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  try {
    const response = await axios.post("/api/cloud/submitForm", { name, email });
    const message = response.data.message || "Submission successful";
    document.getElementById("message").innerText = `✅ ${message}`;
  } catch (err) {
    document.getElementById("message").innerText = "❌ Submission failed.";
    console.error("Form submission error:", err);
  }
});
