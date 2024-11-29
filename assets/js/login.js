const loginButton = document.getElementById("loginButton");
const loadingScreen = document.getElementById("loading-screen");

loginButton.addEventListener("click", (event) => {
  event.preventDefault();

  loadingScreen.classList.remove("hidden");

  setTimeout(() => {
    window.location.href = "./dashboard.html";
  }, 1500);
});
