var intervalID = setInterval(cycleImg, 3000);

var imgGallery = ['001', '004', '007', '025', '039'];
var $img = document.querySelector('img');
var counter = 0;
var imgCount = imgGallery.length - 1;
var $progressDot = document.querySelectorAll('.progress-dot');
var $imgCarousel = document.querySelector('.image-carousel');
var $progressBar = document.querySelector('.progress-bar');

function cycleImg() {
  counter++;
  $img.src = 'http://127.0.0.1:5500/javascript-carousel/images/' + imgGallery[counter] + '.png';
  if (counter > imgCount) {
    counter = 0;
  }
  $img.src = 'http://127.0.0.1:5500/javascript-carousel/images/' + imgGallery[counter] + '.png';
  cycleDot();
}

function reset() {
  clearInterval(intervalID);
  intervalID = setInterval(cycleImg, 3000);
}

$imgCarousel.addEventListener('click', control);

function control(event) {
  if (event.target.classList.contains('fa-chevron-right')) {
    counter++;
    $img.src = 'http://127.0.0.1:5500/javascript-carousel/images/' + imgGallery[counter] + '.png';
    if (counter > imgCount) {
      counter = 0;
    }
    $img.src = 'http://127.0.0.1:5500/javascript-carousel/images/' + imgGallery[counter] + '.png';
    cycleDot();
  } else {
    counter--;

    $img.src = 'http://127.0.0.1:5500/javascript-carousel/images/' + imgGallery[counter] + '.png';
    if (counter < 0) {
      counter = imgCount;
    }
    $img.src = 'http://127.0.0.1:5500/javascript-carousel/images/' + imgGallery[counter] + '.png';
    cycleDot();
  }
  reset();
}

function cycleDot(event) {
  for (var i = 0; i < $progressDot.length; i++) {
    if (i === counter) {
      $progressDot[i].children.item(0).className = 'fas fa-circle';
    } else {
      $progressDot[i].children.item(0).className = 'far fa-circle';
    }
  }
}

$progressBar.addEventListener('click', function (event) {

  if (!event.target.classList.contains('fa-circle')) {
    return;
  }
  var dataIndex = event.target.getAttribute('data-id');

  $img.src = 'http://127.0.0.1:5500/javascript-carousel/images/' + imgGallery[dataIndex - 1] + '.png';

  for (var i = 0; i < $progressDot.length; i++) {
    if (dataIndex - 1 === i) {
      $progressDot[i].children.item(0).className = 'fas fa-circle';
    } else {
      $progressDot[i].children.item(0).className = 'far fa-circle';
    }
  }

  counter = dataIndex - 1;
  reset();
});
