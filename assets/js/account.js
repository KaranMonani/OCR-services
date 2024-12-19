class FileInstance {
  constructor(
    file,
    categories,
    updateCategoryAvailability,
    updateAnalyzeButtonVisibility
  ) {
    this.file = file;
    this.selectedCategory = null;
    this.categories = categories;
    this.updateCategoryAvailability = updateCategoryAvailability; // Function to update category availability
    this.updateAnalyzeButtonVisibility = updateAnalyzeButtonVisibility; // Function to update Analyze button visibility
  }

  createListItem() {
    const listItem = document.createElement("li");
    listItem.className =
      "flex items-center justify-between p-3 bg-gray-50 border rounded-lg shadow";

    listItem.innerHTML = `
      <div class="flex items-center space-x-3">
        <i class="fas fa-file-alt text-custom-blue text-xl"></i>
        <div>
          <p class="text-sm font-semibold text-gray-800">${this.file.name}</p>
          <p class="text-xs text-gray-500">${(this.file.size / 1024).toFixed(
            2
          )} KB</p>
        </div>
      </div>
      <div class="flex items-center space-x-4">
        <select class="category-select bg-white border border-gray-300 text-custom-blue text-sm rounded-lg focus:border-custom-blue focus:border-custom-blue block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-white light:text-white light:focus:ring-blue-500 light:focus:border-custom-blue">
          <option value="">Select Category</option>
          ${this.categories
            .map(
              (category) => `<option value="${category}">${category}</option>`
            )
            .join("")}
        </select>
        <button class="text-red-500 hover:text-red-700">
          <i class="fas fa-trash-alt text-lg"></i>
        </button>
      </div>
    `;

    const selectElement = listItem.querySelector("select");
    selectElement.addEventListener("change", (event) => {
      this.handleCategoryChange(event.target.value);
    });

    listItem.querySelector("button").addEventListener("click", () => {
      this.removeListItem(listItem);
    });

    return listItem;
  }

  handleCategoryChange(selectedValue) {
    // Re-enable previously selected category if changing selection
    if (this.selectedCategory) {
      console.log(`Re-enabling category: ${this.selectedCategory}`);
      this.updateCategoryAvailability(this.selectedCategory, true); // Re-enable the category
    }

    // Disable the newly selected category
    if (selectedValue) {
      console.log(`Disabling category: ${selectedValue}`);
      this.selectedCategory = selectedValue;
      this.updateCategoryAvailability(selectedValue, false); // Disable the category
    } else {
      this.selectedCategory = null;
    }
  }

  removeListItem(listItem) {
    if (this.selectedCategory) {
      console.log(`Removing category: ${this.selectedCategory}`);
      this.updateCategoryAvailability(this.selectedCategory, true); // Re-enable the category
    }
    listItem.remove();
    this.updateAnalyzeButtonVisibility(); // Update the visibility of the Analyze button
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("logo-sidebar");
  const collapseBtn = document.getElementById("collapse-btn");
  const sidebarToggleIcon = document.getElementById("sidebar-toggle-icon");
  const fileInput = document.getElementById("file-input");
  const fileList = document.getElementById("file-list");
  const errorMessage = document.getElementById("error-message");
  const analyzeButton = document.getElementById("analyze-button");
  const loadingScreen = document.getElementById("loading-screen");
  const maxFiles = 5; // Maximum number of files allowed

  const categories = [
    "Tax Document",
    "Invoice",
    "Expense Report",
    "Payroll",
    "Bank Statement",
  ];

  // Global state to track selected categories
  const selectedCategories = new Set();

  // Function to update category availability
  function updateCategoryAvailability(category, isAvailable) {
    console.log(
      `Updating availability for category: ${category}, Available: ${isAvailable}`
    );
    const selectElements = document.querySelectorAll(".category-select");
    selectElements.forEach((select) => {
      const options = select.querySelectorAll("option");
      options.forEach((option) => {
        if (option.value === category) {
          option.disabled = !isAvailable; // Enable or disable based on isAvailable
        }
      });
    });
  }

  // Function to update Analyze button visibility
  function updateAnalyzeButtonVisibility() {
    if (fileList.children.length > 0) {
      analyzeButton.classList.remove("hidden");
    } else {
      analyzeButton.classList.add("hidden");
    }
  }

  // Browse Files Trigger
  if (fileInput) {
    document
      .getElementById("browse-files")
      .addEventListener("click", () => fileInput.click());

    // Handle File Upload
    fileInput.addEventListener("change", (event) => {
      const files = event.target.files;
      // Check if adding files exceeds the limit
      if (fileList.children.length + files.length > maxFiles) {
        alert(`You can only upload up to ${maxFiles} files.`);
        fileInput.value = ""; // Clear the input
        return;
      }

      for (let file of files) {
        const fileInstance = new FileInstance(
          file,
          categories,
          updateCategoryAvailability,
          updateAnalyzeButtonVisibility
        );
        const listItem = fileInstance.createListItem();
        fileList.appendChild(listItem);
      }

      // Clear input after adding files
      fileInput.value = "";

      // Update Analyze button visibility
      updateAnalyzeButtonVisibility();
    });

    // Analyze Button Validation
    analyzeButton.addEventListener("click", () => {
      let allValid = true;
      const selectElements = fileList.querySelectorAll("select");

      selectElements.forEach((select) => {
        if (!select.value) {
          allValid = false;
        }
      });
      if (!allValid) {
        // Show animated error message
        errorMessage.classList.remove("opacity-0", "translate-x-full");
        setTimeout(() => {
          errorMessage.classList.add("opacity-0", "translate-x-full");
        }, 3000);
      } else {
        loadingScreen.classList.remove("hidden");
        setTimeout(() => {
          window.location.href =
            "../account-analysis/account-observations.html";
        }, 2000);
      }
    });
  }

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
