'use strict';

(function () {

  var ads = [];

  function generateAds(data) {
    ads = data;
    for (var i = 0; i < ads.length; i++) {
      ads[i].id = i;
    }
    window.pin.generateAndRenderPins(ads);
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


  window.card = {
    renderOfferCard: renderOfferCard,
    adsOfUsers: window.backend.loadData(generateAds, window.backend.showErrorMessage)
  };


})();
