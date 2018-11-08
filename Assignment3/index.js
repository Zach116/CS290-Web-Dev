/*
 * Write your JS code in this file.  Don't forget to include your name and
 * @oregonstate.edu email address below.
 *
 * Name: Zach Bishop
 * Email: bishopz@oregonstate.edu
 */

function filterByText() {
  var filterText = document.getElementById('filter-text').value.toLowerCase();
  var allPosts = document.getElementsByClassName('post');

  for (var i = (allPosts.length - 1); i > -1; i--) {
    if (allPosts[i].querySelector('a').textContent.toLowerCase().indexOf(filterText) == -1) {
      allPosts[i].remove();
    }
  }
}

function filterByMinPrice() {
  var minPrice = document.getElementById('filter-min-price').value;
  var allPosts = document.getElementsByClassName('post');

  for (var i = (allPosts.length - 1); i > -1; i--) {
    if (parseInt(allPosts[i].getAttribute('data-price'),10) < parseInt(minPrice,10)) {
      allPosts[i].remove();
    }
  }
}

function filterByMaxPrice() {
  var maxPrice = document.getElementById('filter-max-price').value;
  var allPosts = document.getElementsByClassName('post');

  for (var i = (allPosts.length - 1); i > -1; i--) {
    if (parseInt(allPosts[i].getAttribute('data-price'),10) > parseInt(maxPrice,10)) {
      allPosts[i].remove();
    }
  }
}

// function filterByMaxAndMinPrice() {
//   var maxPrice = document.getElementById('filter-max-price').value;
//   var minPrice = document.getElementById('filter-min-price').value;
//   var allPosts = document.getElementsByClassName('post');
//
//   for (var i = (allPosts.length - 1); i > -1; i--) {
//     if (parseInt(allPosts[i].getAttribute('data-price'),10) > parseInt(maxPrice,10)) {
//       allPosts[i].remove();
//     }
//   }
// }

function getFilterCity() {
  fieldset = document.getElementById('filter-city');
  options = fieldset.querySelectorAll('option');

  for (var i = 0; i < options.length; i++) {
    if (options[i].selected) {
      return options[i].value;
    }
  }
}

function filterByCity() {
  var city = getFilterCity();
  var allPosts = document.getElementsByClassName('post');

  for (var i = (allPosts.length - 1); i > -1; i--) {
    if (allPosts[i].getAttribute('data-city') != city) {
      allPosts[i].remove();
    }
  }
}

function getFilterCondition() {
  fieldset = document.getElementById('filter-condition');
  radioButtons = fieldset.querySelectorAll('input');

  for (var i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      return radioButtons[i].value;
    }
  }
}

function filterByCondition() {
  var condition = getFilterCondition();
  var allPosts = document.getElementsByClassName('post');

  for (var i = (allPosts.length - 1); i > -1; i--) {
    if (allPosts[i].getAttribute('data-condition') !== condition) {
      allPosts[i].remove();
    }
  }
}

function conditionChecked() {
  fieldset = document.getElementById('filter-condition');
  radioButtons = fieldset.querySelectorAll('input');

  for (var i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      return true;
    }
  }
  return false;
}

function filter() {
  if (document.getElementById('filter-text') != "") {
    filterByText();
  }
  if (document.getElementById('filter-min-price') != "") {
    filterByMinPrice();
  }
  if (document.getElementById('filter-max-price') != "") {
    filterByMaxPrice();
  }
  if (!document.querySelector('#filter-city').querySelector('option').selected) {
    filterByCity();
  }
  if (conditionChecked()) {
    filterByCondition();
  }
}

function toggleModal() {
  var modalBackdrop = document.getElementById('modal-backdrop');
  var sellSomethingModal = document.getElementById('sell-something-modal');
  var inputFieldDivs = document.getElementsByClassName('post-input-element');

  //Clear text
  for (var i = 0; i < 4; i++) {
    var inputField = inputFieldDivs[i].querySelector('input');
    inputField.value = "";
  }

  modalBackdrop.classList.toggle('hidden');
  sellSomethingModal.classList.toggle('hidden');
}

function checkForEmptyFields() {
  var inputFieldDivs = document.getElementsByClassName('post-input-element');

  for (var i = 0; i < 4; i++) {
    var inputField = inputFieldDivs[i].querySelector('input');
    if (inputField.value === "") {
      return true;
    }
  }
  return false;
}

function getCondition() {
  fieldset = document.querySelector('fieldset.post-fieldset');
  radioButtons = fieldset.querySelectorAll('input');

  for (var i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      return radioButtons[i].value;
    }
  }
}

function generatePost() {
  if (checkForEmptyFields()) {
    alert("Do not leave any text field blank!");
  }
  else {
    //Gather user info
    var inputFieldDivs = document.getElementsByClassName('post-input-element');
    var itemDescription = inputFieldDivs[0].querySelector('input').value;
    var photoURL = inputFieldDivs[1].querySelector('input').value;
    var price = inputFieldDivs[2].querySelector('input').value;
    var city = inputFieldDivs[3].querySelector('input').value;
    var condition = getCondition();

    //generate posts
    var postContainer = document.createElement('div');
    postContainer.classList.add('post');
    postContainer.setAttribute('data-price', price);
    postContainer.setAttribute('data-city', city);
    postContainer.setAttribute('data-condition', condition);

    var postContents = document.createElement('div');
    postContents.classList.add('post-contents');
    postContainer.appendChild(postContents);

    var postImageContainer = document.createElement('div');
    postImageContainer.classList.add('post-image-container');
    postContents.appendChild(postImageContainer);

    var image = document.createElement('img');
    image.setAttribute('src', photoURL);
    image.setAttribute('alt', itemDescription);
    postImageContainer.appendChild(image);

    var postInfoContainer = document.createElement('div');
    postInfoContainer.classList.add('post-info-container');
    postContents.appendChild(postInfoContainer);

    var postTitle = document.createElement('a');
    postTitle.classList.add('post-title');
    postTitle.setAttribute('href', '#');
    postTitle.textContent = itemDescription;
    postInfoContainer.appendChild(postTitle);

    var postPrice = document.createElement('span');
    postPrice.classList.add('post-price');
    postPrice.textContent = '$' + price;
    postInfoContainer.appendChild(postPrice);

    var postCity = document.createElement('span');
    postCity.classList.add('post-city');
    postCity.textContent = '(' + city + ')';
    postInfoContainer.appendChild(postCity);

    var allPosts = document.querySelector('#posts');
    allPosts.appendChild(postContainer);

    //Close and clear modal
    toggleModal();
  }
}

var updateButton = document.getElementById('filter-update-button');
var sellSomethingButton = document.getElementById('sell-something-button');
var modalClose = document.getElementById('modal-close');
var modalCancel = document.getElementById('modal-cancel');
var modalAccept = document.getElementById('modal-accept');
updateButton.addEventListener('click', filter);
sellSomethingButton.addEventListener('click', toggleModal);
modalClose.addEventListener('click', toggleModal);
modalCancel.addEventListener('click', toggleModal);
modalAccept.addEventListener('click', generatePost);
