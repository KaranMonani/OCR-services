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

  const sidebarButtons = document.querySelectorAll(".sidebar-button");
  const lastButton = document.querySelector(".menu-button");

  const defaultTab = document.querySelector(
    '.sidebar-button[data-tab-target="#detail"]'
  );
  defaultTab.classList.add("text-white", "bg-custom-blue");
  const defaultIcon = defaultTab.querySelector("svg");
  defaultIcon.classList.replace("text-gray-500", "text-white");
  document.querySelector("#detail").classList.remove("hidden");

  const removeSidebarActiveClass = () => {
    sidebarButtons.forEach((btn) => {
      btn.classList.remove("text-white", "bg-custom-blue");
      btn.classList.add("text-gray-500", "bg-gray-50", "hover:bg-gray-100");

      const icon = btn.querySelector("svg");
      icon.classList.replace("text-white", "text-gray-500");
    });
  };

  sidebarButtons.forEach((item) => {
    item.addEventListener("click", function () {
      removeSidebarActiveClass();

      this.classList.add("text-white", "bg-custom-blue");
      this.classList.remove("text-gray-500", "bg-gray-50", "hover:bg-gray-100");
      const activeIcon = this.querySelector("svg");
      activeIcon.classList.replace("text-gray-500", "text-white");

      tabContents.forEach((content) => content.classList.add("hidden"));
      const targetId = this.getAttribute("data-tab-target");
      document.querySelector(targetId).classList.remove("hidden");
    });
  });

  lastButton.addEventListener("click", function () {
    const secondSidebarButton = document.querySelector(
      '.sidebar-button[data-tab-target="#upload"]'
    );

    removeSidebarActiveClass();

    secondSidebarButton.classList.add("text-white", "bg-custom-blue");
    secondSidebarButton.classList.remove(
      "text-gray-500",
      "bg-gray-50",
      "hover:bg-gray-100"
    );
    const activeIcon = secondSidebarButton.querySelector("svg");
    activeIcon.classList.replace("text-gray-500", "text-white");

    tabContents.forEach((content) => content.classList.add("hidden"));
    document.querySelector("#upload").classList.remove("hidden");
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

const analyzeButton = document.getElementById("analyzeButton");
const loadingScreen = document.getElementById("loading-screen");

analyzeButton.addEventListener("click", (event) => {
  event.preventDefault();

  loadingScreen.classList.remove("hidden");

  setTimeout(() => {
    window.location.href = "./restaurant-analysis-result.html";
  }, 2000);
});

Dropzone.options.pdfDropzone = {
  paramName: "file",
  maxFilesize: 5,
  acceptedFiles: ".pdf,.jpg, .jpeg, .png",
  uploadMultiple: true,
  parallelUploads: 10,
  init: function () {
    this.on("successmultiple", function (files, response) {
      console.log("Successfully uploaded:", files);
    });
    this.on("errormultiple", function (files, response) {
      console.error("Error uploading:", files);
    });
  },
};
