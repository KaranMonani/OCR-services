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
  });
  
  if (
    document.getElementById("selection-table") &&
    typeof simpleDatatables.DataTable !== "undefined"
  ) {
    let multiSelect = true;
    let rowNavigation = false;
    let table = null;
  
    const resetTable = function () {
      if (table) {
        table.destroy();
      }
  
      const options = {
        rowRender: (row, tr, _index) => {
          if (!tr.attributes) {
            tr.attributes = {};
          }
          if (!tr.attributes.class) {
            tr.attributes.class = "";
          }
          if (row.selected) {
            tr.attributes.class += " selected";
          } else {
            tr.attributes.class = tr.attributes.class.replace(" selected", "");
          }
          if (tr instanceof HTMLElement) {
            tr.setAttribute("data-row-id", row.id || _index);
          }
          return tr;
        },
      };
      if (rowNavigation) {
        options.rowNavigation = true;
        options.tabIndex = 1;
      }
  
      table = new simpleDatatables.DataTable("#selection-table", options);
  
      table.data.data.forEach((data) => {
        data.selected = false;
      });
  
      table.on("datatable.selectrow", (rowIndex, event) => {
        event.preventDefault();
        const row = table.data.data[rowIndex];
        if (row.selected) {
          row.selected = false;
        } else {
          if (!multiSelect) {
            table.data.data.forEach((data) => {
              data.selected = false;
            });
          }
          row.selected = true;
        }
        table.update();
      });
    };
  
    const isMobile = window.matchMedia("(any-pointer:coarse)").matches;
    if (isMobile) {
      rowNavigation = false;
    }
  
    resetTable();
  

  }
  
  const analyzeButton = document.getElementById("createCompany");
  const loadingScreen = document.getElementById("loading-screen");
  
  if (analyzeButton) {
    analyzeButton.addEventListener("click", (event) => {
      event.preventDefault();
  
      loadingScreen.classList.remove("hidden");
  
      setTimeout(() => {
        window.location.href = "./company-dashboard.html";
      }, 2000);
    });
  }
  