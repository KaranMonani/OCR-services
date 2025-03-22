document.addEventListener("DOMContentLoaded", () => {
  // Sidebar Toggle Logic
  const sidebar = document.getElementById("logo-sidebar");
  const collapseBtn = document.getElementById("collapse-btn");
  const sidebarToggleIcon = document.getElementById("sidebar-toggle-icon");

  if (sidebar && collapseBtn && sidebarToggleIcon) {
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
  }

  // Initialize DataTables
  const activityTable = document.getElementById("activity-table");
  if (activityTable) {
    $("#activity-table").DataTable({
      paging: true,
      pageLength: 10,
      lengthMenu: [10, 25, 50, 100],
      searching: true,
      ordering: true,
      info: true,
      order: [[0, "desc"]],
      lengthChange: false,
    });
  }
});
