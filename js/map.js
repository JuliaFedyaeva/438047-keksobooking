'use strict';

(function() {
  var selectMap = document.querySelector('.map');
  var selectForm = document.querySelector('.notice__form');
  var selectFieldset = selectForm.querySelectorAll('fieldset');
  var mapPinMain = selectMap.querySelector('.map__pin--main');
  var selectAddress = selectForm.querySelector('#address');
  var ESC_KEYCODE = 27;

  function window.map.setAddress(x, y) {
    selectAddress.value = x + ', ' + y;
  }

  function window.map.setActiveState() {
    selectForm.classList.remove('notice__form--disabled');
    selectMap.classList.remove('map--faded');
    for (var i = 0; i < selectFieldset.length; i++) {
      selectFieldset[i].disabled = false;
    }
  }

  function window.map.setInactiveState() {

    selectForm.classList.add('notice__form--disabled');
    selectMap.classList.add('map--faded');

    for (var i = 0; i < selectFieldset.length; i++) {
      selectFieldset[i].disabled = true;
    }

    mapPinMain.removeAttribute('style');
    window.map.setAddress(mapPinMain.offsetLeft, mapPinMain.offsetTop);
    mapPinMain.addEventListener('mouseup', pinMouseupHandler);
  }

  function window.map.pinMoveHandler(event) {
    var pinLeft = event.currentTarget.offsetLeft;
    var pinTop = event.currentTarget.offsetTop;
    var pinX = pinLeft + PIN.WIDTH;
    var pinY = pinTop + PIN.HEIGHT;

    window.map.setAddress(pinX, pinY);
  }

  function pinMouseupHandler() {
    window.map.setActiveState();
    window.pin.generateAndRenderPins(adsOfUsers);
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

  function window.map.removePopup() {
    var card = selectMap.querySelector('.map__card');

    if (card) {
      selectMap.removeChild(card);
      document.removeEventListener('keydown', escPopup);
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
    buttonClose.addEventListener('click', removePopup);
    document.addEventListener('keydown', escPopup);
  }

})();
