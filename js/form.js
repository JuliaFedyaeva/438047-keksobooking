'use strict';

(function() {
  var selectCheckIn = selectForm.querySelector('#timein');
  var selectCheckOut = selectForm.querySelector('#timeout');
  var selectType = selectForm.querySelector('#type');
  var selectPrice = selectForm.querySelector('#price');
  var selectRooms = selectForm.querySelector('#room_number');
  var selectGuests = selectForm.querySelector('#capacity');
  var selectSubmit = selectForm.querySelector('.form__submit');
  var selectNoticeForm = document.querySelector('.notice__form');
  var selectFormReset = selectNoticeForm.querySelector('.form__reset');

  window.form ={
    checkGuestsField: function checkGuestsField() {
    var threeGuests = selectGuests.options[0];
    var twoGuests = selectGuests.options[1];
    var oneGuest = selectGuests.options[2];
    var notForGuests = selectGuests.options[3];

    for (var i = 0; i < selectGuests.options.length; i++) {
      selectGuests.options[i].disabled = false;
    }

    switch (selectRooms.value) {
      case '1': {
        selectGuests.value = '1';
        twoGuests.disabled = true;
        threeGuests.disabled = true;
        notForGuests.disabled = true;
        return;
      }

      case '2': {
        selectGuests.value = '2';
        threeGuests.disabled = true;
        notForGuests.disabled = true;
        return;
      }

      case '3': {
        selectGuests.value = '3';
        notForGuests.disabled = true;
        return;
      }

      case '100': {
        selectGuests.value = '0';
        oneGuest.disabled = true;
        twoGuests.disabled = true;
        threeGuests.disabled = true;
        return;
      }
    }
  }
};

  selectType.addEventListener('change', function (event) {
    var minPrice = event.target.querySelector('option[value=' + event.target.value + ']').dataset.min;

    selectPrice.setAttribute('min', minPrice);
    selectPrice.placeholder = minPrice;
  });

  selectCheckIn.addEventListener('change', function () {
    selectCheckOut.value = selectCheckIn.value;
  });

  selectCheckOut.addEventListener('change', function () {
    selectCheckIn.value = selectCheckOut.value;
  });


  function removePins() {
    var pins = selectMap.querySelectorAll('.map__pin:not(.map__pin--main)');

    if (pins.length === 0) {
      return;
    }

    for (var i = 0; i < pins.length; i++) {
      pins[i].remove();
    }
  }


  function setDefaultValueForm() {
    selectForm.reset();
    window.map.removePopup();
    removePins();
    checkGuestsField();
    window.map.setInactiveState();
  }


  var MAIN_PIN_RADIUS = 31;
  var PIN_BOTTOM_PART = 22;
  var MAP_TOP_LIMIT = 100;


  var rightMapBorder = selectMap.clientWidth - MAIN_PIN_RADIUS;
  var leftMapBorder = MAIN_PIN_RADIUS;
  var mapFilter = selectMap.querySelector('.map__filters-container');
  var bottomMapBorder = selectMap.clientHeight - MAIN_PIN_RADIUS - PIN_BOTTOM_PART - mapFilter.clientHeight;
  var topMapBorder = MAP_TOP_LIMIT - MAIN_PIN_RADIUS;


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

      window.map.setAddress(
        mapPinMain.offsetLeft + MAIN_PIN_RADIUS,
        mapPinMain.offsetTop + MAIN_PIN_RADIUS + PIN_BOTTOM_PART);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });


  window.map.setInactiveState();

  mapPinMain.addEventListener('mouseup', window.map.pinMoveHandler);

  selectRooms.addEventListener('change', checkGuestsField);
  selectSubmit.addEventListener('click', checkGuestsField);
  selectForm.addEventListener('submit', setDefaultValueForm);
  selectFormReset.addEventListener('click', setDefaultValueForm);

})();
