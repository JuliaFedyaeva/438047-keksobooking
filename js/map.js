'use strict';

(function () {

  var PIN = window.CONFIG.PIN;

  var selectMap = document.querySelector('.map');
  var selectForm = document.querySelector('.notice__form');
  var selectFieldset = selectForm.querySelectorAll('fieldset');
  var mapPinMain = selectMap.querySelector('.map__pin--main');
  var selectAddress = selectForm.querySelector('#address');

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

  function removePopup() {
    var card = selectMap.querySelector('.map__card');

    if (card) {
      selectMap.removeChild(card);
      document.removeEventListener('keydown', escPopup);
    }
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
//    window.pin.generateAndRenderPins(window.card.adsOfUsers);
    window.backend.loadData(window.pin.generateAndRenderPins, window.backend.getErrorRequest);
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
    window.utils.isEscEvent(evt, removePopup);
  }

  function clickOnPin(evt) {
    var popup = selectMap.querySelector('.map__card');

    if (popup) {
      removePopup();
    }

    var index = evt.currentTarget.dataset.id;
    window.card.renderOfferCard(window.card.adsOfUsers[index]);

    var buttonClose = selectMap.querySelector('.popup__close');
    buttonClose.addEventListener('click', removePopup);
    document.addEventListener('keydown', escPopup);
  }

  window.map = {
    setAddress: setAddress,

    setActiveState: setActiveState,

    setInactiveState: setInactiveState,

    removePopup: removePopup,

    pinMoveHandler: pinMoveHandler

  };
})();
