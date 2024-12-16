const turnoverCtx = document.getElementById("turnoverChart").getContext("2d");
new Chart(turnoverCtx, {
  type: "bar",
  data: {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Previous Year",
        data: [8, 14, 16, 18, 5, 15, 2, 12, 3, 13, 4, 14],
        backgroundColor: "rgba(0, 123, 255, 0.5)",
      },
    ],
  },
});

const profitCtx = document.getElementById("profitChart").getContext("2d");
new Chart(profitCtx, {
  type: "line",
  data: {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Profit (₹ in Lakhs)",
        data: [10, 20, 15, 25, 30, 35, 40, 45, 50, 55, 60, 65],
        borderColor: "rgba(255, 193, 7, 0.8)",
        fill: false,
      },
    ],
  },
});

var ctx = document.getElementById("salesChart").getContext("2d");
var salesChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Sales",
        data: [12, 19, 3, 5, 2],
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

function generatePDF() {
  const element = document.body; // or specify a specific section
  html2pdf()
    .from(element)
    .set({
      margin: 0,
      filename: "Business_Report.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 1,
        y: 0,
        x: 0,
        scrollY: 0,
        scrollX: 0,
        windowWidth: 800,
      },
      jsPDF: {
        unit: "in",
        format: [8.5, 11],
        orientation: "portrait",
        precision: 0,
      },
    })
    .save();
}
