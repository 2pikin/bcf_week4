$(document).ready(function() {

function popChart(d) {
  var ctx = document.getElementById("popChart").getContext("2d");
  var data = d;
  var options = {
    legend: {
      display: false
    }
  }
  var myDoughnutChart = new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: options
  });
}

// popChart({
//     datasets: [{
//         backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f"],
//         data: [10, 30, 30]
//     }],
//
//     // These labels appear in the legend and in the tooltips when hovering different arcs
//     labels: [
//         'Red',
//         'Yellow',
//         'Blue'
//     ]
// });

function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var daysSpan = clock.querySelector('.days');
  var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    var t = getTimeRemaining(endtime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

var deadline = new Date(Date.parse('May 14, 2018') + 15 * 24 * 60 * 60 * 1000);
initializeClock('clockdiv', deadline);

function ExchangeChart() {
  var data = getRandomData(new Date(Date.now() - 41 * 24 * 3600 * 1000), 30);
  // Candlestick
  var ctx = document.getElementById("chart1").getContext("2d");
  // ctx.canvas.width = 1000;
  // ctx.canvas.height = 250;
  new Chart(ctx, {
    type: 'candlestick',
    data: {
      datasets: [{
        label: "VAT Tokens",
        data: data,
        fractionalDigitsCount: 2,
      }]
    },
    options: {
      tooltips: {
        position: 'nearest',
        mode: 'index',
      },
    },
  });
}

ExchangeChart();

if(typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
  console.log(`OK: ${web3.version}`);
} else {
  alert('You must install MetaMask!');
}

// update current user balance
const updateBalance = async () => {
  const accounts  = await web3.eth.getAccounts();
  const abi = [
  	{
  		"constant": false,
  		"inputs": [],
  		"name": "buy",
  		"outputs": [],
  		"payable": true,
  		"stateMutability": "payable",
  		"type": "function"
  	},
  	{
  		"constant": false,
  		"inputs": [
  			{
  				"name": "_to",
  				"type": "address"
  			},
  			{
  				"name": "_value",
  				"type": "uint256"
  			}
  		],
  		"name": "transfer",
  		"outputs": [],
  		"payable": false,
  		"stateMutability": "nonpayable",
  		"type": "function"
  	},
  	{
  		"payable": true,
  		"stateMutability": "payable",
  		"type": "fallback"
  	},
  	{
  		"inputs": [],
  		"payable": false,
  		"stateMutability": "nonpayable",
  		"type": "constructor"
  	},
  	{
  		"constant": true,
  		"inputs": [
  			{
  				"name": "",
  				"type": "uint256"
  			}
  		],
  		"name": "address_list",
  		"outputs": [
  			{
  				"name": "",
  				"type": "address"
  			}
  		],
  		"payable": false,
  		"stateMutability": "view",
  		"type": "function"
  	},
  	{
  		"constant": true,
  		"inputs": [
  			{
  				"name": "",
  				"type": "address"
  			}
  		],
  		"name": "balanceOf",
  		"outputs": [
  			{
  				"name": "",
  				"type": "uint256"
  			}
  		],
  		"payable": false,
  		"stateMutability": "view",
  		"type": "function"
  	},
  	{
  		"constant": true,
  		"inputs": [],
  		"name": "buyPrice",
  		"outputs": [
  			{
  				"name": "",
  				"type": "uint256"
  			}
  		],
  		"payable": false,
  		"stateMutability": "view",
  		"type": "function"
  	},
  	{
  		"constant": true,
  		"inputs": [
  			{
  				"name": "_addr",
  				"type": "address"
  			}
  		],
  		"name": "getBalance",
  		"outputs": [
  			{
  				"name": "_balance",
  				"type": "uint256"
  			}
  		],
  		"payable": false,
  		"stateMutability": "view",
  		"type": "function"
  	},
  	{
  		"constant": true,
  		"inputs": [],
  		"name": "index",
  		"outputs": [
  			{
  				"name": "",
  				"type": "uint256"
  			}
  		],
  		"payable": false,
  		"stateMutability": "view",
  		"type": "function"
  	}
  ];
  const SimpleToken = new web3.eth.Contract(abi, '0xa59d5637b6cb82436423624a028ac35211772c25');
  const balance = await SimpleToken.methods.balanceOf(accounts[0]).call();
  $('#token').text(balance);

  const index = await SimpleToken.methods.index().call();
  let backgroundColor = [];
  let data = [];
  let labels = [];
  for (let i = 0; i <= index; i += 1) {
    let address = await SimpleToken.methods.address_list(i).call();
    backgroundColor.push(`#${address.substring(2, 8)}`);
    labels.push(address);
    let bal = await SimpleToken.methods.balanceOf(address).call();
    data.push(bal);
  }
  let d = {
      datasets: [{
          backgroundColor,
          data
      }],
      labels
  };
  console.log(`d:${JSON.stringify(d)}`);
  popChart(d);
}

updateBalance();

$('#buy-button').click(async function() {
  $('#progressbar').removeClass('hide');
  const accounts  = await web3.eth.getAccounts();
  await web3.eth.sendTransaction({
    from: accounts[0],
    to: '0x61ce1269ed504f7e7ffa142bf0f944b82f382991',
    value: web3.utils.toWei($('#inputEthers').val(), 'ether')
  }, function(error) {
    console.log(error);
  })
  updateBalance();
  $('#inputEthers').val('');
  $('#progressbar').addClass('hide');
})
})
