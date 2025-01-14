document.addEventListener("DOMContentLoaded", () => {
  const resetPasswordForm = document.getElementById("resetPasswordForm");
  const successMessage = document.getElementById("success-message");

  resetPasswordForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const newPassword = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const newPasswordError = document.getElementById("newPasswordError");
    const confirmPasswordError = document.getElementById("confirmPasswordError");

    if (newPassword.length < 8) {
      newPasswordError.classList.remove("hidden");
      return;
    } else {
      newPasswordError.classList.add("hidden");
    }

    if (newPassword !== confirmPassword) {
      confirmPasswordError.classList.remove("hidden");
      return;
    } else {
      confirmPasswordError.classList.add("hidden");
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
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword }),
      });

      if (!response.ok) {
        throw new Error("Failed to reset password");
      }

      const result = await response.json();
      successMessage.classList.remove("translate-x-full", "opacity-0");
      setTimeout(() => {
        successMessage.classList.add("translate-x-full", "opacity-0");
        window.location.href = './index.html';
      }, 3000);
    } catch (error) {
      console.error("Error resetting password:", error);
      alert("Error resetting password");
    } finally {
      loadingScreen.classList.add("hidden");
    }
    */
  });
});
