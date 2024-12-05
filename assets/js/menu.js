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
