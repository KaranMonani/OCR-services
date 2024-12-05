const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const loadingScreen = document.getElementById("loading-screen");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let isValid = true;

  // Validate email
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
    emailInput.classList.add(
      "bg-red-50",
      "border-red-500",
      "text-red-900",
      "focus:ring-red-500",
      "focus:border-red-500"
    );
    emailError.classList.remove("hidden");
    isValid = false;
  } else {
    emailInput.classList.remove(
      "bg-red-50",
      "border-red-500",
      "text-red-900",
      "focus:ring-red-500",
      "focus:border-red-500"
    );
    emailError.classList.add("hidden");
  }

  // Validate password
  if (passwordInput.value.length < 8) {
    passwordInput.classList.add(
      "bg-red-50",
      "border-red-500",
      "text-red-900",
      "focus:ring-red-500",
      "focus:border-red-500"
    );
    passwordError.classList.remove("hidden");
    isValid = false;
  } else {
    passwordInput.classList.remove(
      "bg-red-50",
      "border-red-500",
      "text-red-900",
      "focus:ring-red-500",
      "focus:border-red-500"
    );
    passwordError.classList.add("hidden");
  }

  // If valid, show loader and redirect
  if (isValid) {
    loadingScreen.classList.remove("hidden");

    setTimeout(() => {
      window.location.href = "./dashboard/dashboard.html";
    }, 1500);
  }
});
