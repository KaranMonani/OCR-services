const turnoverCtx = document
  .getElementById("turnoverChart")
  .getContext("2d");
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

var ctx = document.getElementById('salesChart').getContext('2d');
var salesChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [{
            label: 'Sales',
            data: [12, 19, 3, 5, 2],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});


document.getElementById('generate-pdf').addEventListener('click', function() {
  // Select the element you want to convert to PDF
  const element = document.querySelector('.letter-wrapper'); // Adjust the selector as needed

  // Options for the PDF
  const options = {
      margin: 1,
      filename: 'document.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  // Generate the PDF
  html2pdf().from(element).set(options).save();
});