'use strict';

(function() {

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


  function generateAds() {
    var ads = [];

    for (var i = 0; i < USERS; i++) {
      ads.push(getAd(i));
    }
    return ads;
  }

  function getAd(id) {
    var locationX = window.data.getRandomNumber(PIN.X.MIN, PIN.X.MAX);
    var locationY = window.data.getRandomNumber(PIN.Y.MIN, PIN.Y.MAX);

    return {
      author: {
        avatar: window.data.getAvatarURL(id + 1)
      },
      offer: {
        title: window.data.getRandomElement(TITLES_ADS),
        address: (locationX + ', ' + locationY),
        price: window.data.getRandomNumber(MIN_PRICE, MAX_PRICE),
        type: window.data.getRandomElement(TYPES_OF_ROOMS),
        rooms: window.data.getRandomNumber(MIN_QUANTITY_OF_ROOMS, MAX_QUANTITY_OF_ROOMS),
        guests: window.data.getRandomNumber(MIN_GUEST, MAX_GUEST),
        checkin: window.data.getRandomElement(CHECK_IN_OUT_TIME),
        checkout: window.data.getRandomElement(CHECK_IN_OUT_TIME),
        features: window.data.getArraySlice(FEATURES),
        description: '',
        photos: window.data.getShuffleArray(PHOTOS)
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
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

  function window.card.renderOfferCard(apartment) {
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

  var window.card.adsOfUsers = generateAds(USERS);

})();
