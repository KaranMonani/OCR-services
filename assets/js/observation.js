document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("logo-sidebar");
    const collapseBtn = document.getElementById("collapse-btn");
    const sidebarToggleIcon = document.getElementById("sidebar-toggle-icon");
    const rightPanel = document.getElementById("right-panel");

    // Initialize with collapsed sidebar (only icons are visible)
    sidebar.classList.add("collapsed");

    // Toggle the sidebar collapse when the button is clicked
    collapseBtn.addEventListener("click", () => {
      sidebar.classList.toggle("collapsed");

      // Change the toggle button icon (rotate arrow)
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

  // Show Profile tab by default
  const defaultTab = document.querySelector(
    '.menu-item[data-tab-target="#profile"]'
  );

  defaultTab.classList.add("text-white", "bg-custom-blue");
  const defaultIcon = defaultTab.querySelector("i");
  defaultIcon.classList.replace("text-gray-500", "text-white");
  document.querySelector("#profile").classList.remove("hidden");

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

var ctx1 = document.getElementById("myChart1").getContext("2d");
var ctx2 = document.getElementById("myChart2").getContext("2d");
const ctx3 = document.getElementById("profitComparisonChart").getContext("2d");
const ctx4 = document.getElementById("expenseComparisonChart").getContext("2d");

var chart1 = new Chart(ctx1, {
  type: "bar",
  data: {
    labels: ["Product A", "Product B", "Product C"],
    datasets: [
      {
        label: "Sales 2023",
        data: [12, 19, 3],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Sales 2024",
        data: [25, 15, 10],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

var chart2 = new Chart(ctx2, {
  type: "line",
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Website Traffic",
        data: [120, 190, 300, 250, 400, 350, 500],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

const profitComparisonLineChart = new Chart(ctx3, {
  type: "line", // Using line chart instead of bar chart
  data: {
    labels: ["2023", "2024"],
    datasets: [
      {
        label: "Profit ($)",
        data: [500000, 650000], // Example values: 2023 profit and 2024 profit
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1, // Smooth curve
        borderWidth: 2,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    responsive: true,
  },
});

const expenseComparisonDoughnutChart = new Chart(ctx4, {
  type: "doughnut", // Using doughnut chart
  data: {
    labels: ["Direct Expenses", "Indirect Expenses"],
    datasets: [
      {
        label: "Expense ($)",
        data: [350000, 150000], // Example values: Direct expenses and Indirect expenses
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)"],
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.label + ": $" + tooltipItem.raw.toLocaleString(); // Format values with commas
          },
        },
      },
    },
  },
});
