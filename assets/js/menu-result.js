document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("logo-sidebar");
  const collapseBtn = document.getElementById("collapse-btn");
  const sidebarToggleIcon = document.getElementById("sidebar-toggle-icon");
  const rightPanel = document.getElementById("right-panel");

  sidebar.classList.add("collapsed");

  collapseBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");

    if (sidebar.classList.contains("collapsed")) {
      sidebarToggleIcon.classList.replace(
        "fa-chevron-left",
        "fa-chevron-right"
      );
    } else {
      sidebarToggleIcon.classList.replace(
        "fa-chevron-right",
        "fa-chevron-left"
      );
    }
  });

const menuItems = document.querySelectorAll(".menu-item");
const tabContents = document.querySelectorAll(".tab-content");

const defaultTab = document.querySelector(
  '.menu-item[data-tab-target="#specials"]'
);

defaultTab.classList.add("text-white", "bg-custom-blue");
const defaultIcon = defaultTab.querySelector("i");
defaultIcon.classList.replace("text-gray-500", "text-white");
document.querySelector("#specials").classList.remove("hidden");

menuItems.forEach((item) => {
  item.addEventListener("click", function () {
    menuItems.forEach((menu) => {
      menu.classList.remove("text-white", "bg-custom-blue");
      menu.classList.add("text-gray-500", "bg-gray-50", "hover:bg-gray-100");

      const icon = menu.querySelector("i");
      icon.classList.replace("text-white", "text-gray-500");
    });

    this.classList.add("text-white", "bg-custom-blue");
    this.classList.remove("text-gray-500", "bg-gray-50", "hover:bg-gray-100");

    const activeIcon = this.querySelector("i");
    activeIcon.classList.replace("text-gray-500", "text-white");

    tabContents.forEach((content) => content.classList.add("hidden"));

    const targetId = this.getAttribute("data-tab-target");
    document.querySelector(targetId).classList.remove("hidden");
  });
});
});
