// Common JS
function loadService(serviceName) {
  document.getElementById("loading-screen").style.display = "flex";
  setTimeout(() => {
    document.getElementById("loading-screen").style.display = "none";
    window.location.href = serviceName;
  }, 1000);
}
const userNameElement = document.getElementById("user-name");
const userName = userNameElement.textContent.trim();

const initial = userName.charAt(0).toUpperCase();

const initialIconElement = document.getElementById("initial-icon");
initialIconElement.textContent = initial;