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
  type: "line",
  data: {
    labels: ["2023", "2024"],
    datasets: [
      {
        label: "Profit ($)",
        data: [500000, 650000],
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
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
  type: "doughnut",
  data: {
    labels: ["Direct Expenses", "Indirect Expenses"],
    datasets: [
      {
        label: "Expense ($)",
        data: [350000, 150000],
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
            return tooltipItem.label + ": $" + tooltipItem.raw.toLocaleString();
          },
        },
      },
    },
  },
});
