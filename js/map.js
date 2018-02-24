'use strict';

var USERS = 8;

var MIN_GUEST = 1;
var MAX_GUEST = 20;

var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;

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
  },
  HEIGHT: 75,
  WIDTH: 56
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

var CHECK_IN_OUT_TIME = [
  '12:00',
  '13:00',
  '14:00'
];

var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'elevator',
  'conditioner'
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
  var copyArray = array.slice();

  for (var i = copyArray.length - 1; i > 0; i--) {
    var randomIndex = Math.floor(Math.random() * (i + 1));
    var tempValue = copyArray[i];
    copyArray[i] = copyArray[randomIndex];
    copyArray[randomIndex] = tempValue;
  }
  return copyArray;
}

function getRandomElement(array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function getArraySlice(array) {
  var randomIndex = Math.floor(Math.random() * (array.length + 1));
  return array.slice(randomIndex, array.length);
}

function getAvatarURL(id) {
  if (id < 10) {
    id = '0' + id;
  }
  return 'img/avatars/user' + id + '.png';
}

function generateAds() {
  var ads = [];

  for (var i = 0; i < USERS; i++) {
    ads.push(getAd(i));
  }
  return ads;
}

function getAd(id) {
  var locationX = getRandomNumber(PIN.X.MIN, PIN.X.MAX);
  var locationY = getRandomNumber(PIN.Y.MIN, PIN.Y.MAX);

  return {
    author: {
      avatar: getAvatarURL(id + 1)
    },
    offer: {
      title: getRandomElement(TITLES_ADS),
      address: (locationX + ', ' + locationY),
      price: getRandomNumber(MIN_PRICE, MAX_PRICE),
      type: getRandomElement(TYPES_OF_ROOMS),
      rooms: getRandomNumber(MIN_QUANTITY_OF_ROOMS, MAX_QUANTITY_OF_ROOMS),
      guests: getRandomNumber(MIN_GUEST, MAX_GUEST),
      checkin: getRandomElement(CHECK_IN_OUT_TIME),
      checkout: getRandomElement(CHECK_IN_OUT_TIME),
      features: getArraySlice(FEATURES),
      description: '',
      photos: getShuffleArray(PHOTOS)
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
}

function generateAndRenderPins(pinsData) {
  var pinsContainer = document.querySelector('.map__pins');
  var pinsFragment = document.createDocumentFragment();
  var pinsTemplate = document.querySelector('template').content.querySelector('.map__pin');

  for (var i = 0; i < pinsData.length; i++) {
    var pin = pinsTemplate.cloneNode(true);
    var pinImg = pin.querySelector('img');

    pin.style.left = pinsData[i].location.x + 'px';
    pin.style.top = pinsData[i].location.y + 'px';
    pinImg.src = pinsData[i].author.avatar;
    pin.dataset.id = i;
    pinsFragment.appendChild(pin);
  }
  pinsContainer.appendChild(pinsFragment);
}

function getRightWordForm(num, wordForms) {
  var number = Math.abs(num);
  var reminderOfHundred = number % 100;
  var reminderOfTen = number % 10;
  var index = 0;

  if (reminderOfTen > 1 && reminderOfTen < 5) {
    index = 1;
  } else if (reminderOfHundred > 4 && reminderOfHundred < 20 || reminderOfTen === 0 || reminderOfTen >= 5) {
    index = 2;
  }
  return wordForms[index];
}

function renderApartmentPhoto(container, pictures) {
  var picturesFragment = document.createDocumentFragment();
  var picturesElement = container.querySelector('li');

  for (var i = 0; i < pictures.length; i++) {
    var apartmentPicture = picturesElement.cloneNode(true);
    apartmentPicture.querySelector('img').src = pictures[i];
    apartmentPicture.querySelector('img').width = 50;
    picturesFragment.appendChild(apartmentPicture);
  }
  container.appendChild(picturesFragment);
}

function getFeatureElement(featureElement) {
  var liFragment = document.createDocumentFragment();
  var newElement = document.createElement('li');
  newElement.className = 'feature feature--' + featureElement;
  liFragment.appendChild(newElement);
  return liFragment;
}

function renderOfferCard(apartment) {
  var containerElement = document.querySelector('.map__filters-container');
  var cardTemplate = document.querySelector('template').content.querySelector('.map__card');
  var offerCard = cardTemplate.cloneNode(true);
  var picturesContainer = offerCard.querySelector('.popup__pictures');
  var featuresContainer = offerCard.querySelector('.popup__features');
  var featuresList = apartment.offer.features;

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
  offerCard.querySelector('.popup__title').textContent = apartment.offer.title;
  offerCard.querySelector('.popup__price').textContent = apartment.offer.price + ' ₽/ночь';
  offerCard.querySelector('.popup__type').textContent = typeOfOffer[apartment.offer.type];
  offerCard.querySelector('.popup__features').textContent = '';
  offerCard.querySelector('.popup__address').textContent = apartment.offer.address;
  offerCard.querySelector('.popup__rooms').textContent = apartment.offer.rooms + ' ' + roomsWordFormsCorrect + ' для ' + apartment.offer.guests + ' ' + guestsWordFormsCorrect;
  offerCard.querySelector('.popup__check').textContent = 'Заезд после ' + apartment.offer.checkin + ', выезд до ' + apartment.offer.checkout;
  offerCard.querySelector('.popup__descripton').textContent = apartment.offer.description;

  for (var i = 0; i < featuresList.length; i++) {
    var element = getFeatureElement(featuresList[i]);
    featuresContainer.appendChild(element);
  }

  renderApartmentPhoto(picturesContainer, apartment.offer.photos);

  containerElement.parentNode.insertBefore(offerCard, containerElement);
}

var adsOfUsers = generateAds(USERS);

// Задание 4.1

var selectMap = document.querySelector('.map');
var selectForm = document.querySelector('.notice__form');
var selectFieldset = selectForm.querySelectorAll('fieldset');
var mapPinMain = selectMap.querySelector('.map__pin--main');
var selectAddress = selectForm.querySelector('#address');
var ESC_KEYCODE = 27;

function setAddress(x, y) {
  selectAddress.value = x + ', ' + y;
}

function setActiveState() {
  selectForm.classList.remove('notice__form--disabled');
  selectMap.classList.remove('map--faded');
  for (var i = 0; i < selectFieldset.length; i++) {
    selectFieldset[i].disabled = false;
  }
}

function setInactiveState() {

  selectForm.classList.add('notice__form--disabled');
  selectMap.classList.add('map--faded');

  for (var i = 0; i < selectFieldset.length; i++) {
    selectFieldset[i].disabled = true;
  }

  mapPinMain.removeAttribute('style');
  setAddress(mapPinMain.offsetLeft, mapPinMain.offsetTop);
  mapPinMain.addEventListener('mouseup', pinMouseupHandler);
}

function pinMoveHandler(event) {
  var pinLeft = event.currentTarget.offsetLeft;
  var pinTop = event.currentTarget.offsetTop;
  var pinX = pinLeft + PIN.WIDTH;
  var pinY = pinTop + PIN.HEIGHT;

  setAddress(pinX, pinY);
}

function pinMouseupHandler() {
  setActiveState();
  generateAndRenderPins(adsOfUsers);
  addPinsHandlers();

  mapPinMain.removeEventListener('mouseup', pinMouseupHandler);
  checkGuestsField();
}

function addPinsHandlers() {
  var pins = selectMap.querySelectorAll('.map__pin:not(.map__pin--main)');
  for (var i = 0; i < pins.length; i++) {
    pins[i].addEventListener('click', clickOnPin);
  }
}

function removePopup() {
  var card = selectMap.querySelector('.map__card');
  if (card){
  selectMap.removeChild(card);
  document.removeEventListener('keydown', escPopup);
  }
}

function escPopup(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    removePopup();
  }
}

function clickOnPin(evt) {
  var popup = selectMap.querySelector('.map__card');
  if (popup) {
    removePopup();
  }
  var index = evt.currentTarget.dataset.id;
  renderOfferCard(adsOfUsers[index]);

  var buttonClose = selectMap.querySelector('.popup__close');
  buttonClose.addEventListener('click', removePopup);
  document.addEventListener('keydown', escPopup);
}

// Задание 4.2

var selectCheckIn = selectForm.querySelector('#timein');
var selectCheckOut = selectForm.querySelector('#timeout');
var selectType = selectForm.querySelector('#type');
var selectPrice = selectForm.querySelector('#price');
var selectRooms = selectForm.querySelector('#room_number');
var selectGuests = selectForm.querySelector('#capacity');
var selectSubmit = selectForm.querySelector('.form__submit');
var selectNoticeForm = document.querySelector('.notice__form');
var selectFormTitleField = selectNoticeForm.querySelector('#title');
var selectFormDescriptionField = selectNoticeForm.querySelector('#description');
var selectFormReset = selectNoticeForm.querySelector('.form__reset');


function checkGuestsField() {
  var threeGuests = selectGuests.options[0];
  var twoGuests = selectGuests.options[1];
  var oneGuest = selectGuests.options[2];
  var notForGuests = selectGuests.options[3];

  for (var i = 0; i < selectGuests.options.length; i++) {
    selectGuests.options[i].disabled = false;
  }

  switch (selectRooms.value) {
    case '1': {
      selectGuests.value = '1';
      twoGuests.disabled = true;
      threeGuests.disabled = true;
      notForGuests.disabled = true;
      return;
    }
    case '2': {
      selectGuests.value = '2';
      threeGuests.disabled = true;
      notForGuests.disabled = true;
      return;
    }
    case '3': {
      selectGuests.value = '3';
      notForGuests.disabled = true;
      return;
    }
    case '100': {
      selectGuests.value = '0';
      oneGuest.disabled = true;
      twoGuests.disabled = true;
      threeGuests.disabled = true;
      return;
    }
  }
}

selectType.addEventListener('change', function (event) {
  var minPrice = event.target.querySelector('option[value=' + event.target.value +']').dataset.min;

  selectPrice.setAttribute('min', minPrice);
  selectPrice.placeholder = minPrice;
});

selectCheckIn.addEventListener('change', function () {
  selectCheckOut.value = selectCheckIn.value;
});

selectCheckOut.addEventListener('change', function () {
  selectCheckIn.value = selectCheckOut.value;
});


function removePins() {
  var pins = selectMap.querySelectorAll('.map__pin:not(.map__pin--main)');
  if (pins.length === 0) {
  return;
 }

 for (var i = 0; i < pins.length; i++) {
  pins[i].remove();
  }
}


function setDefaultValueForm() {
 var DEFAULT = {
   TYPE: 'flat',
   TIME: '12:00',
   ROOMS: '1'
 };

  selectType.value = DEFAULT.TYPE;
  selectCheckIn.value = DEFAULT.TIME;
  selectRooms.value = DEFAULT.ROOMS;

  selectPrice.value = '';
  selectFormTitleField.value = '';
  selectFormDescriptionField.value = '';
  removePopup();
  removePins();
  checkGuestsField();
  setInactiveState();
}


var MAIN_PIN_RADIUS = 31;
var PIN_BOTTOM_PART = 22;
var MAP_TOP_LIMIT = 100;


var rightMapBorder = selectMap.clientWidth - MAIN_PIN_RADIUS;
var leftMapBorder = MAIN_PIN_RADIUS;
var mapFilter = selectMap.querySelector('.map__filters-container');
var bottomMapBorder = selectMap.clientHeight - MAIN_PIN_RADIUS - PIN_BOTTOM_PART - mapFilter.clientHeight;
var topMapBorder = MAP_TOP_LIMIT - MAIN_PIN_RADIUS;



mapPinMain.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.target.parentElement.clientX,
    y: evt.target.parentElement.clientY
  };
  var onMouseMove = function (moveEvt) {
  var shift = {
    x: startCoords.x - moveEvt.clientX,
    y: startCoords.y - moveEvt.clientY
  };

  startCoords = {
     x: moveEvt.clientX,
     y: moveEvt.clientY
  };

  if (mapPinMain.offsetTop - shift.y < bottomMapBorder && mapPinMain.offsetTop - shift.y > topMapBorder) {
    mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
  }

  if (mapPinMain.offsetLeft - shift.x > leftMapBorder && mapPinMain.offsetLeft - shift.x < rightMapBorder) {
    mapPinMain.style.left = mapPinMain.offsetLeft - shift.x + 'px';
  }

  setAddress(
    mapPinMain.offsetLeft + MAIN_PIN_RADIUS,
    mapPinMain.offsetTop + MAIN_PIN_RADIUS + PIN_BOTTOM_PART);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
});


setInactiveState();

mapPinMain.addEventListener('mouseup', pinMoveHandler);

selectRooms.addEventListener('change', checkGuestsField);
selectSubmit.addEventListener('click', checkGuestsField);
selectSubmit.addEventListener('submit', setDefaultValueForm);
selectFormReset.addEventListener('click', setDefaultValueForm);
