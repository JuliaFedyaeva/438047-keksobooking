'use strict';

(function () {
  var selectMap = document.querySelector('.map');

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
      pin.dataset.id = pinsData[i].id;
      pin.addEventListener('click', clickOnPin);
      pinsFragment.appendChild(pin);
    }
    pinsContainer.appendChild(pinsFragment);
  }

  function clickOnPin(event) {
    var popup = selectMap.querySelector('.map__card');

    if (popup) {
      window.card.remove();
    }

    var currentId = event.currentTarget.dataset.id;
    var cardData = window.pinsData.getById(currentId);
    window.card.render(cardData);

    var buttonClose = selectMap.querySelector('.popup__close');
    buttonClose.addEventListener('click', window.card.remove);
    document.addEventListener('keydown', window.card.removeByEsc);
  }

  function removeAll() {
    var pins = selectMap.querySelectorAll('.map__pin:not(.map__pin--main)');

    if (pins.length === 0) {
      return;
    }

    for (var i = 0; i < pins.length; i++) {
      pins[i].remove();
    }
  }

  window.pin = {
    removeAll: removeAll,
    generateAndRenderPins: generateAndRenderPins
  };
})();

