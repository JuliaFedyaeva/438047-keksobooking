'use strict';

var USERS = 8;

var MIN_GUEST = 1;
var MAX_GUEST = 20;

var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;

var PIN_HEIGHT = 75;
var PIN_WIDTH = 56;

var MIN_QUANTITY_OF_ROOMS = 1;
var MAX_QUANTITY_OF_ROOMS = 5;

var PIN = {
 X: {
   MIN: 300,
   MAX: 900
 },
 Y: {
   MIN: 100,
   MAX: 500
 }
};

var TITLES_ADS = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var TYPES_OF_ROOMS = [
  'flat',
  'house',
  'bungalo'
];

var CHECK_IN_OUT = [
  '12:00',
  '13:00',
  '14:00'
];

var FEATURES = [
  ' wifi',
  ' dishwasher',
  ' parking',
  ' elevator',
  ' conditioner'
];

var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getShuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var randomIndex = Math.floor(Math.random() * (i + 1));
    var tempValue = array[i];
    array[i] = array[randomIndex];
    array[randomIndex] = tempValue;
  }
  return array;
}

function getRandomElement(array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function getArraySlice(array) {
  var randomIndex = Math.floor(Math.random() * (array.length + 1));
  return array.slice(randomIndex, array.length);
}

function generateAvatars() {
  var listOfAvatars = [];

  for (var i = 1; i <= USERS; i++) {
    if (i < 10) {
      i = '0' + i;
    }
    var avatar = 'img/avatars/user' + i + '.png';
    listOfAvatars.push(avatar);
  }
  return listOfAvatars;
}

function generateAds() {
  var ads = [];
  var userAvatar = getShuffleArray(generateAvatars());
  var titleOfAds = getRandomElement(TITLES_ADS);

  for (var i = 0; i < USERS; i++) {
    var locationX = getRandomNumber(PIN.X.MIN, PIN.X.MAX);
    var locationY = getRandomNumber(PIN.Y.MIN, PIN.Y.MAX);

    ads.push({
      'author': {
        'avatar': userAvatar[i]
      },
      'offer': {
        'title': titleOfAds[i],
        'adress': (locationX + ', ' + locationY),
        'price': getRandomNumber(MIN_PRICE, MAX_PRICE),
        'type': getRandomElement(TYPES_OF_ROOMS),
        'rooms': getRandomNumber(MIN_QUANTITY_OF_ROOMS, MAX_QUANTITY_OF_ROOMS),
        'guests': getRandomNumber(MIN_GUEST, MAX_GUEST),
        'checkin': getRandomElement(CHECK_IN_OUT),
        'checkout': getRandomElement(CHECK_IN_OUT),
        'features': getArraySlice(FEATURES),
        'description': '',
        'photos': getShuffleArray(PHOTOS)
      },
      'location': {
        'x': locationX,
        'y': locationY
      }
    });
  }
  return ads;
}

function createPins (array) {
  var pinsContainer = document.querySelector('.map__pins');
  var pinsFragment = document.createDocumentFragment();
  var pinsTemplate = document.querySelector('template').content.querySelector('.map__pin');

  for (var i = 0; i < array.length; i++) {
    var pin = pinsTemplate.cloneNode(true);
    var pinImg = pin.querySelector('img');

    pin.style.left = (array[i].location.x - PIN_HEIGHT) + 'px';
    pin.style.top = array[i].location.y - (PIN_WIDTH / 2) + 'px';
    pinImg.src = array[i].author.avatar;
    pinsFragment.appendChild(pin);
  }
  pinsContainer.appendChild(pinsFragment);
}

var getRightWordForm = function (num, wordForms) {
  var number = Math.abs(num);
  var a = number % 100;
  var b = number % 10;
  var index = 0;

  if (a > 4 && a < 20 || b === 0 || b >= 5) {
    index = 2;
  } else if (b > 1 && b < 5) {
    index = 1;
  }

  return wordForms[index];
};

var deleteOddFeatures = function (featureItems, featuresList) {
  for (var i = 0; i < featureItems.length; i++) {
    if (featuresList.indexOf(featureItems[i].className.split('--')[1]) === -1) {
      featureItems[i].remove();
    }
  }
};

var renderApartmentPhoto = function (container, pictures) {
  var picturesFragment = document.createDocumentFragment();
  var picturesElement = container.querySelector('li');

  for (var i = 0; i < pictures.length; i++) {
    var apartmentPicture = picturesElement.cloneNode(true);
    apartmentPicture.querySelector('img').src = pictures[i];
    apartmentPicture.querySelector('img').width = 50;
    picturesFragment.appendChild(apartmentPicture);
  }
  container.appendChild(picturesFragment);
};

var renderOfferCard = function (apartment) {
  var containerElement = document.querySelector('.map__filters-container');
  var cardTemplate = document.querySelector('template').content.querySelector('.map__card');
  var offerCard = cardTemplate.cloneNode(true);
  var paragraph = offerCard.querySelectorAll('p');
  var featureElements = offerCard.querySelectorAll('.feature');
  var picturesContainer = offerCard.querySelector('.popup__pictures');

  var typeOfOffer = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом'
  };

  var roomsWordForms = ['комната', 'комнаты', 'комнат'];
  var guestsWordForms = ['гостя', 'гостей', 'гостей'];
  var roomsWordFormsCorrect = getRightWordForm(apartment.offer.rooms, roomsWordForms);
  var guestsWordFormsCorrect = getRightWordForm(apartment.offer.guests, guestsWordForms);

  offerCard.querySelector('.popup__avatar').src = apartment.author.avatar;
  offerCard.querySelector('h3').textContent = apartment.offer.title;
  offerCard.querySelector('.popup__price').textContent = apartment.offer.price + ' ₽/ночь';
  offerCard.querySelector('h4').textContent = typeOfOffer[apartment.offer.type];
  offerCard.querySelector('.popup__features').textContent = apartment.offer.features;

  paragraph[0].textContent = apartment.offer.address;
  paragraph[2].textContent = apartment.offer.rooms + ' ' + roomsWordFormsCorrect + ' для ' + apartment.offer.guests + ' ' + guestsWordFormsCorrect;
  paragraph[3].textContent = 'Заезд после ' + apartment.offer.checkin + ', выезд до ' + apartment.offer.checkout;
  paragraph[4].textContent = apartment.offer.description;

  deleteOddFeatures(featureElements, apartment.offer.features);

  renderApartmentPhoto(picturesContainer, apartment.offer.photos);

  containerElement.parentNode.insertBefore(offerCard, containerElement);
};

var adsOfUsers = generateAds(USERS);

createPins(adsOfUsers);
renderOfferCard(adsOfUsers[0]);
var mapHiddenOff = document.querySelector('section.map');
mapHiddenOff.classList.remove('map--faded');


