document.addEventListener("DOMContentLoaded", () => {
  const forgotPasswordForm = document.getElementById("forgotPasswordForm");
  const successMessage = document.getElementById("success-message");

  forgotPasswordForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const emailError = document.getElementById("emailError");

    if (!validateEmail(email)) {
      emailError.classList.remove("hidden");
      return;
    } else {
      emailError.classList.add("hidden");
    }

    const loadingScreen = document.getElementById("loading-screen");
    loadingScreen.classList.remove("hidden");

    setTimeout(() => {
      loadingScreen.classList.add("hidden");
      successMessage.classList.remove("translate-x-full", "opacity-0");
      setTimeout(() => {
        successMessage.classList.add("translate-x-full", "opacity-0");
        window.location.href = './index.html';
      }, 3000);
    }, 1000);

    /*
    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to send reset password email");
      }

      const result = await response.json();
      alert("Password reset email sent successfully");
    } catch (error) {
      console.error("Error sending reset password email:", error);
      alert("Error sending reset password email");
    } finally {
      loadingScreen.classList.add("hidden");
    }
    */
  });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
});
