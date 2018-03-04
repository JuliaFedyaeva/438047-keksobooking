'use strict';

(function () {
  var selectMap = document.querySelector('.map');

  function generateAndRender(pinsData) {
    var pinsContainer = document.querySelector('.map__pins');
    var pinsFragment = document.createDocumentFragment();
    var pinsTemplate = document.querySelector('template').content.querySelector('.map__pin');

    for (var i = 0; i < pinsData.length; i++) {
      var pin = pinsTemplate.cloneNode(true);
      var pinImg = pin.querySelector('img');

      pin.style.left = pinsData[i].location.x + 'px';
      pin.style.top = pinsData[i].location.y + 'px';
      pinImg.src = pinsData[i].author.avatar;
      pin.dataset.id = pinsData[i].id;
      pin.addEventListener('click', advertsClickHandler);
      pinsFragment.appendChild(pin);
    }
    pinsContainer.appendChild(pinsFragment);
  }

  function advertsClickHandler(event) {
    var popup = selectMap.querySelector('.map__card');

    if (popup) {
      window.card.popupRemoveHandler();
    }

    var currentId = event.currentTarget.dataset.id;
    var cardData = window.pinsData.getById(currentId);
    window.card.render(cardData);

    var buttonClose = selectMap.querySelector('.popup__close');
    buttonClose.addEventListener('click', window.card.popupRemoveHandler);
    document.addEventListener('keydown', window.card.popupRemoveByEscHandler);
  }

  function removeAll() {
    var pins = selectMap.querySelectorAll('.map__pin:not(.map__pin--main)');

    if (pins.length === 0) {
      return;
    }

    for (var i = 0; i < pins.length; i++) {
      pins[i].removeEventListener('click', advertsClickHandler);
      pins[i].remove();
    }
  }

  window.pin = {
    removeAll: removeAll,
    generateAndRender: generateAndRender
  };
})();

