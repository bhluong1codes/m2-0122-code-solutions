var $userList = document.querySelector('#user-list');

var xhr = new XMLHttpRequest();

xhr.open('GET', 'https://jsonplaceholder.typicode.com/users');
xhr.responseType = 'json';
xhr.addEventListener('load', function () {
  console.log('status:', xhr.status);
  console.log('response:', xhr.response);
  for (var i = 0; i < xhr.response.length; i++) {

    var listItem = document.createElement('li');
    listItem.textContent = xhr.response[i].name;
    $userList.appendChild(listItem);
  }

});
xhr.send();
