'use strict';

(function () {

  var PIN = window.CONFIG.PIN;
  var MAX_PINS = window.CONFIG.MAX_PINS;

  var selectMap = document.querySelector('.map');
  var selectForm = document.querySelector('.notice__form');
  var selectFieldset = selectForm.querySelectorAll('fieldset');
  var mapPinMain = selectMap.querySelector('.map__pin--main');
  var mapFilter = selectMap.querySelector('.map__filters-container');

  function setActiveState() {
    selectForm.classList.remove('notice__form--disabled');
    selectMap.classList.remove('map--faded');

    for (var i = 0; i < selectFieldset.length; i++) {
      selectFieldset[i].disabled = false;
    }

    window.backend.loadData(
        function (data) {
          window.pinsData.add(data);
          var filteredPins = window.pinsData.getTo(MAX_PINS);
          window.pin.generateAndRenderPins(filteredPins);
        },
        window.backend.showErrorMessage
    );
    mapFilter.addEventListener('change', onFilterInputChange);
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
    window.pinsData.clear();
    mapFilter.removeEventListener('change', onFilterInputChange);
  }

//  function removePopup() {
//    var card = selectMap.querySelector('.map__card');

//    if (card) {
//      selectMap.removeChild(card);
//      document.removeEventListener('keydown', escPopup);
//    }
//  }

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

 // function escPopup(evt) {
 //   window.utils.isEscEvent(evt, removePopup);
 // }

  function pressEnter(evt) {
    if (evt.keyCode === window.CONFIG.KEY_CODES.ENTER) {
      setActiveState();
    }
    mapPinMain.removeEventListener('keydown', pressEnter);
  }

//  function clickOnPin(event) {
//    var popup = selectMap.querySelector('.map__card');

  //   if (popup) {
 //     removePopup();
  //  }

  //  window.card.renderOfferCard(pins[event.currentTarget.dataset.id]);

  //  var buttonClose = selectMap.querySelector('.popup__close');
  //  buttonClose.addEventListener('click', removePopup);
  //  document.addEventListener('keydown', escPopup);
 // }

 // function filtredPins() {
 //   removePopup();
 //   clearPinsData();

 //   pins = window.filter.filteredData();
 //   addPinsData(pins);
 // }

  function onFilterInputChange(evt) {
    if (evt.target.tagName === 'INPUT' || evt.target.tagName === 'SELECT') {
      window.debounce(function() {
        var filteredPins = window.filter.getFiltered();
        window.pin.removeAll();
        window.pin.generateAndRenderPins(filteredPins);
      });
    }
  }

  setInactiveState();
  mapPinMain.addEventListener('mouseup', pinMoveHandler);
  mapPinMain.addEventListener('keydown', pressEnter);

  window.map = {
    setInactiveState: setInactiveState
  };
})();
