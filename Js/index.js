let customerTable = document.querySelector('#customerTable');
let filterByName = document.querySelector('#filterByName');
let filterByAmount = document.querySelector('#filterByAmount');
let customerTableBody = document.querySelector('#customerTableBody');
let transactionChart = document.querySelector('#transactionChart');


let userData = [];
let chart;

// Fetch
async function customerData() {

    let response = await fetch('http://localhost:3000/transactions');
    let data = await response.json();
    console.log(data);
    userData = data;
    display(data);
    updateChart(data); 
  }

customerData()

// Display
function display(data) {
  let cartona = '';

  for (let i = 0; i < data.length; i++) {
    cartona += `
      <tr>
        <td>${data[i].name}</td>
        <td>${data[i].date}</td>
        <td>${data[i].amount}</td>
      </tr>
    `;
  }

  customerTableBody.innerHTML = cartona;
}

// SearchByName Functions
function searchByName() {
  filterByName.addEventListener('input', function (e) {
    let searchString = e.target.value.toLowerCase();
    let filteredItems = userData.filter(function(data) {
      let name = data.name.toLowerCase();
      return name.includes(searchString);
    });
    display(filteredItems);
    updateChart(filteredItems); 
  });
}

// SearchByAmount
function searchByAmount() {
  filterByAmount.addEventListener('input', function (e) {
    let amountValue = e.target.value;
    let filteredItems = userData.filter(function(data) {
      let amount = data.amount.toString();
      return amount.includes(amountValue);
    });
    display(filteredItems);
    updateChart(filteredItems); 
  });
}


searchByName();
searchByAmount();

// Initialize Chart Function
function initializeChart() {
  chart = new Chart(transactionChart, {
    type: 'bar',
    data: {
      labels: [], 
      datasets: [{
        label: 'Customer Transactions',
        data: [], 
        borderWidth: 1
      }]
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}


// Update Chart Function
function updateChart(data) {
  let names = [];
  let amounts = [];

  
  for (let i = 0; i < data.length; i++) {
    names.push(data[i].name)
    amounts.push(data[i].amount)
  }

  chart.data.labels = names;
  chart.data.datasets[0].data = amounts;
  chart.update();
}


initializeChart();
