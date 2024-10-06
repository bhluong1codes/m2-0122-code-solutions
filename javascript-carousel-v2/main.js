var interval = 3000;
var intervalID = setInterval(cycleImg, interval);
var imageUrls = [
  '001.png',
  '004.png',
  '007.png',
  '025.png',
  '039.png',
  '007.png'
];
var $activeImage = document.querySelector('img');
var counter = 0;
var $indicators = document.querySelector('.indicators');
var $imgCarousel = document.querySelector('.img-carousel');

// Display image in carousel

function reset() {
  clearInterval(intervalID);
  intervalID = setInterval(cycleImg, interval);
}

// cycle through image
function cycleImg() {
  counter++;
  $activeImage.src = `images/${imageUrls[counter]}`;
  if (counter > imageUrls.length - 1) {
    counter = 0;
  }
  $activeImage.src = `images/${imageUrls[counter]}`;
}

// nav button controls

$imgCarousel.addEventListener('click', function (event) {
  if (event.target.classList.contains('fa-chevron-left')) {
    counter--;
    if (counter < 0) {
      counter = imageUrls.length - 1;
    }
    $activeImage.src = `images/${imageUrls[counter]}`;
    reset();
  } else if (event.target.classList.contains('fa-chevron-right')) {
    counter++;
    if (counter > imageUrls.length - 1) {
      counter = 0;
    }
    $activeImage.src = `images/${imageUrls[counter]}`;
    reset();
  }
});

// indicator controls
var indicator = document.createElement('div');
$indicators.appendChild(indicator);

// method that needs to be shared: clearinterval
