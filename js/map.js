'use strict';

(function () {
  var PIN = window.CONFIG.PIN;
  var MAP = window.CONFIG.MAP;
  var MAX_PINS = window.CONFIG.MAX_PINS;

  var selectMap = document.querySelector('.map');
  var selectForm = document.querySelector('.notice__form');
  var selectFieldset = selectForm.querySelectorAll('fieldset');
  var mapPinMain = selectMap.querySelector('.map__pin--main');
  var mapFilter = selectMap.querySelector('.map__filters-container');

  var rightMapBorder = selectMap.clientWidth - PIN.RADIUS;
  var leftMapBorder = PIN.RADIUS;
  var bottomMapBorder = selectMap.clientHeight - PIN.RADIUS - PIN.BOTTOM_PART - mapFilter.clientHeight;
  var topMapBorder = MAP.LIMIT.TOP - PIN.RADIUS;

  function sucsessLoadHandler(data) {
    window.pinsData.add(data);
    var filteredPins = window.pinsData.getTo(MAX_PINS);
    window.pin.generateAndRenderPins(filteredPins);
  }

  function setActiveState() {
    selectForm.classList.remove('notice__form--disabled');
    selectMap.classList.remove('map--faded');

    for (var i = 0; i < selectFieldset.length; i++) {
      selectFieldset[i].disabled = false;
    }

    window.backend.loadOffers(sucsessLoadHandler);
    mapFilter.addEventListener('change', onFilterInputChange);
    mapPinMain.removeEventListener('keydown', mainPinEnterHandler);
  }

  function setInactiveState() {
    selectForm.classList.add('notice__form--disabled');
    selectMap.classList.add('map--faded');

    for (var i = 0; i < selectFieldset.length; i++) {
      selectFieldset[i].disabled = true;
    }

    mapPinMain.removeAttribute('style');
    window.form.setAddress(mapPinMain.offsetLeft, mapPinMain.offsetTop);
    window.pinsData.clear();
    mapPinMain.addEventListener('mouseup', pinMouseupHandler);
    mapFilter.removeEventListener('change', onFilterInputChange);
    mapPinMain.addEventListener('keydown', mainPinEnterHandler);
  }

  function pinMouseupHandler() {
    setActiveState();

    mapPinMain.removeEventListener('mouseup', pinMouseupHandler);
  }

  function mainPinEnterHandler(event) {
    window.utils.isEnterEvent(event, setActiveState);
  }

  function onFilterInputChange(evt) {
    if (evt.target.tagName === 'INPUT' || evt.target.tagName === 'SELECT') {
      window.debounce(function () {
        var filteredPinsData = window.filter.getFiltered();
        window.card.remove();
        window.pin.removeAll();
        window.pin.generateAndRenderPins(filteredPinsData);
      });
    }
  }

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.target.parentElement.clientX,
      y: evt.target.parentElement.clientY
    };

    var onMouseMove = function (moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (mapPinMain.offsetTop - shift.y < bottomMapBorder && mapPinMain.offsetTop - shift.y > topMapBorder) {
        mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      }

      if (mapPinMain.offsetLeft - shift.x > leftMapBorder && mapPinMain.offsetLeft - shift.x < rightMapBorder) {
        mapPinMain.style.left = mapPinMain.offsetLeft - shift.x + 'px';
      }

      window.form.setAddress(
          mapPinMain.offsetLeft + PIN.RADIUS,
          mapPinMain.offsetTop + PIN.RADIUS + PIN.BOTTOM_PART
      );
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  setInactiveState();

  window.map = {
    setInactiveState: setInactiveState
  };
})();
