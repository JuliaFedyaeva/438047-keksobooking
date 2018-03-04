'use strict';

(function () {
  var TYPE_OF_OFFER = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом'
  };

  var WORD_FORMS = {
    ROOM: ['комната', 'комнаты', 'комнат'],
    GUEST: ['гостя', 'гостей', 'гостей']
  };

  var selectMap = document.querySelector('.map');

  function popupRemoveHandler() {
    var card = selectMap.querySelector('.map__card');

    if (card) {
      var buttonClose = selectMap.querySelector('.popup__close');
      buttonClose.removeEventListener('click', popupRemoveHandler);
      document.removeEventListener('keydown', popupRemoveByEscHandler);
      selectMap.removeChild(card);
    }
  }

  function popupRemoveByEscHandler(evt) {
    window.utils.isEscEvent(evt, popupRemoveHandler);
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
    var picturesContainer = container.querySelector('li');

    for (var i = 0; i < pictures.length; i++) {
      var apartmentPicture = picturesContainer.cloneNode(true);
      apartmentPicture.querySelector('img').src = pictures[i];
      apartmentPicture.querySelector('img').width = 50;
      picturesFragment.appendChild(apartmentPicture);
    }
    container.appendChild(picturesFragment);
  }

  function renderFeatures(container, features) {
    var liFragment = document.createDocumentFragment();

    for (var i = 0; i < features.length; i++) {
      var featuresContainer = document.createElement('li');
      featuresContainer.className = 'feature feature--' + features[i];
      liFragment.appendChild(featuresContainer);
    }
    return container.appendChild(liFragment);
  }

  function render(data) {
    var container = document.querySelector('.map__filters-container');
    var cardTemplate = document.querySelector('template').content.querySelector('.map__card');
    var offerCard = cardTemplate.cloneNode(true);

    var picturesContainer = offerCard.querySelector('.popup__pictures');
    var featuresContainer = offerCard.querySelector('.popup__features');

    var featuresList = data.offer.features;
    var roomsWordFormsCorrect = getRightWordForm(data.offer.rooms, WORD_FORMS.ROOM);
    var guestsWordFormsCorrect = getRightWordForm(data.offer.guests, WORD_FORMS.GUEST);

    offerCard.querySelector('.popup__avatar').src = data.author.avatar;
    offerCard.querySelector('.popup__title').textContent = data.offer.title;
    offerCard.querySelector('.popup__price').textContent = data.offer.price + ' ₽/ночь';
    offerCard.querySelector('.popup__type').textContent = TYPE_OF_OFFER[data.offer.type];
    offerCard.querySelector('.popup__features').textContent = '';
    offerCard.querySelector('.popup__address').textContent = data.offer.address;
    offerCard.querySelector('.popup__rooms').textContent = data.offer.rooms + ' ' + roomsWordFormsCorrect + ' для ' + data.offer.guests + ' ' + guestsWordFormsCorrect;
    offerCard.querySelector('.popup__check').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    offerCard.querySelector('.popup__descripton').textContent = data.offer.description;

    renderFeatures(featuresContainer, featuresList);
    renderApartmentPhoto(picturesContainer, data.offer.photos);

    container.parentNode.insertBefore(offerCard, container);
  }

  window.card = {
    popupRemoveByEscHandler: popupRemoveByEscHandler,
    popupRemoveHandler: popupRemoveHandler,
    render: render
  };
})();
