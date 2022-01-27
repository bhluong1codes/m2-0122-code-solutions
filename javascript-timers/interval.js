var $countdown = document.querySelector('.countdown-display');
var counter = 4;
var intervalID = setInterval(callbackFunc, 1000);

function callbackFunc() {
  counter--;
  $countdown.textContent = counter;
  if (counter === 0) {
    clearInterval(intervalID);
    $countdown.textContent = '~Earth Beeeelooowww Us~';
  }
}
