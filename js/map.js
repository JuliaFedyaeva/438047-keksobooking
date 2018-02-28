'use strict';

(function () {

  var PIN = window.CONFIG.PIN;
  var pins = [];

  var selectMap = document.querySelector('.map');
  var selectForm = document.querySelector('.notice__form');
  var selectFieldset = selectForm.querySelectorAll('fieldset');
  var mapPinMain = selectMap.querySelector('.map__pin--main');

  function getPinsData() {
    return pins;
  }

  function addPinsData(data) {
    if (data.length === 0) {
      return;
    }
    for (var i = 0; i < data.length; i++) {
      pins.push(data[i]);
    }
  }

  function clearPinsData() {
    pins = [];
  }

  function setActiveState() {
    selectForm.classList.remove('notice__form--disabled');
    selectMap.classList.remove('map--faded');
    for (var i = 0; i < selectFieldset.length; i++) {
      selectFieldset[i].disabled = false;
    }
    window.backend.loadData(
       function(data) {
          addPinsData(data);
          window.pin.generateAndRenderPins(data);
          addPinsHandlers();
          },
        window.backend.showErrorMessage
    );
  }

  function setInactiveState() {

    selectForm.classList.add('notice__form--disabled');
    selectMap.classList.add('map--faded');

    for (var i = 0; i < selectFieldset.length; i++) {
      selectFieldset[i].disabled = true;
    }

    mapPinMain.removeAttribute('style');
    window.form.setAddress(mapPinMain.offsetLeft, mapPinMain.offsetTop);
    mapPinMain.addEventListener('mouseup', pinMouseupHandler);
    clearPinsData();
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

    window.form.setAddress(pinX, pinY);
  }

  function pinMouseupHandler() {
    setActiveState();

    mapPinMain.removeEventListener('mouseup', pinMouseupHandler);
  }

  function addPinsHandlers() {
    var pinsOnMap = selectMap.querySelectorAll('.map__pin:not(.map__pin--main)');

    for (var i = 0; i < pinsOnMap.length; i++) {
      pinsOnMap[i].addEventListener('click', clickOnPin);
    }
  }


  function escPopup(evt) {
    window.utils.isEscEvent(evt, removePopup);
  }

  function clickOnPin(event) {
    var popup = selectMap.querySelector('.map__card');

    if (popup) {
      removePopup();
    }

    window.card.renderOfferCard(pins[event.currentTarget.dataset.id]);

    var buttonClose = selectMap.querySelector('.popup__close');
    buttonClose.addEventListener('click', removePopup);
    document.addEventListener('keydown', escPopup);
  }

  setInactiveState();
  mapPinMain.addEventListener('mouseup', pinMoveHandler);

  window.map = {

    setInactiveState: setInactiveState,

    removePopup: removePopup,

    getPinsData: getPinsData

  };
})();
