var ctx = document.getElementById("popChart").getContext("2d");


var data = {
    datasets: [{
        backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f"],
        data: [10, 20, 30]
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
        'Red',
        'Yellow',
        'Blue'
    ]
};

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


var data = getRandomData(new Date()-60, 60);
// Candlestick
var ctx = document.getElementById("chart1").getContext("2d");
ctx.canvas.width = 1000;
ctx.canvas.height = 250;
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
