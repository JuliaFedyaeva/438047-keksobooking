'use strict';

(function() {

  var PIN = {
    HEIGHT: 75,
    WIDTH: 56
  };

  var selectMap = document.querySelector('.map');
  var selectForm = document.querySelector('.notice__form');
  var selectFieldset = selectForm.querySelectorAll('fieldset');
  var mapPinMain = selectMap.querySelector('.map__pin--main');
  var selectAddress = selectForm.querySelector('#address');
  var ESC_KEYCODE = 27;

  window.map ={
    setAddress: function setAddress(x, y) {
    selectAddress.value = x + ', ' + y;
  },

    setActiveState: function setActiveState() {
    selectForm.classList.remove('notice__form--disabled');
    selectMap.classList.remove('map--faded');
    for (var i = 0; i < selectFieldset.length; i++) {
      selectFieldset[i].disabled = false;
    }
  },

    setInactiveState: function setInactiveState() {

    selectForm.classList.add('notice__form--disabled');
    selectMap.classList.add('map--faded');

    for (var i = 0; i < selectFieldset.length; i++) {
      selectFieldset[i].disabled = true;
    }

    mapPinMain.removeAttribute('style');
      window.map.setAddress(mapPinMain.offsetLeft, mapPinMain.offsetTop);
    mapPinMain.addEventListener('mouseup', pinMouseupHandler);
  },

    removePopup: function removePopup() {
    var card = selectMap.querySelector('.map__card');

    if (card) {
      selectMap.removeChild(card);
      document.removeEventListener('keydown', escPopup);
    }
  },

    pinMoveHandler: function pinMoveHandler(event) {
    var pinLeft = event.currentTarget.offsetLeft;
    var pinTop = event.currentTarget.offsetTop;
    var pinX = pinLeft + PIN.WIDTH;
    var pinY = pinTop + PIN.HEIGHT;

    window.map.setAddress(pinX, pinY);
  }


};


  function pinMouseupHandler() {
    window.map.setActiveState();
    window.pin.generateAndRenderPins(window.card.adsOfUsers);
    addPinsHandlers();

    mapPinMain.removeEventListener('mouseup', pinMouseupHandler);
    window.form.checkGuestsField();
  }

  function addPinsHandlers() {
    var pins = selectMap.querySelectorAll('.map__pin:not(.map__pin--main)');

    for (var i = 0; i < pins.length; i++) {
      pins[i].addEventListener('click', clickOnPin);
    }
  }


  function escPopup(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      window.map.removePopup();
    }
  }

  function clickOnPin(evt) {
    var popup = selectMap.querySelector('.map__card');

    if (popup) {
      window.map.removePopup();
    }

    var index = evt.currentTarget.dataset.id;
    window.card.renderOfferCard(window.card.adsOfUsers[index]);

    var buttonClose = selectMap.querySelector('.popup__close');
    buttonClose.addEventListener('click', window.map.removePopup);
    document.addEventListener('keydown', escPopup);
  }

})();
