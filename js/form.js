'use strict';

(function () {
  var PIN = window.CONFIG.PIN;
  var MAP = window.CONFIG.MAP;

  var selectMap = document.querySelector('.map');
  var selectForm = document.querySelector('.notice__form');
  var mapPinMain = selectMap.querySelector('.map__pin--main');
  var selectCheckIn = selectForm.querySelector('#timein');
  var selectCheckOut = selectForm.querySelector('#timeout');
  var selectType = selectForm.querySelector('#type');
  var selectPrice = selectForm.querySelector('#price');
  var selectRooms = selectForm.querySelector('#room_number');
  var selectGuests = selectForm.querySelector('#capacity');
  var selectSubmit = selectForm.querySelector('.form__submit');
  var selectNoticeForm = document.querySelector('.notice__form');
  var selectFormReset = selectNoticeForm.querySelector('.form__reset');
  var selectTitle = selectForm.querySelector('#title');

  function checkGuestsField() {
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

  var rightMapBorder = selectMap.clientWidth - PIN.RADIUS;
  var leftMapBorder = PIN.RADIUS;
  var mapFilter = selectMap.querySelector('.map__filters-container');
  var bottomMapBorder = selectMap.clientHeight - PIN.RADIUS - PIN.BOTTOM_PART - mapFilter.clientHeight;
  var topMapBorder = MAP.LIMIT.TOP - PIN.RADIUS;


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
          mapPinMain.offsetLeft + PIN.RADIUS,
          mapPinMain.offsetTop + PIN.RADIUS + PIN.BOTTOM_PART);
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
  selectFormReset.addEventListener('click', setDefaultValueForm);

  selectNoticeForm.addEventListener('submit', function (evt) {
    window.backend.saveForm(new FormData(selectNoticeForm), selectNoticeForm.reset(), window.backend.getErrorRequest);
    evt.preventDefault();
  });

  window.form = {
    checkGuestsField: checkGuestsField
  };

})();
