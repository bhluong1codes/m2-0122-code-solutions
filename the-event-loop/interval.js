let count = 3;
const intervalID = setInterval(countDown, 1000);

function countDown() {
  if (count === 0) {
    clearInterval(intervalID);
    console.log('Blast Off!');
  } else {
    console.log(count);
  }
  count--;
}
