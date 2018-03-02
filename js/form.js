'use strict';



(function () {

  var selectMap = document.querySelector('.map');
  var PIN = window.CONFIG.PIN;
  var MAP = window.CONFIG.MAP;

  var selectForm = document.querySelector('.notice__form');
  var mapPinMain = selectMap.querySelector('.map__pin--main');
  var selectAddress = selectForm.querySelector('#address');
  var selectCheckIn = selectForm.querySelector('#timein');
  var selectCheckOut = selectForm.querySelector('#timeout');
  var selectType = selectForm.querySelector('#type');
  var selectPrice = selectForm.querySelector('#price');
  var selectRooms = selectForm.querySelector('#room_number');
  var selectGuests = selectForm.querySelector('#capacity');
  var selectNoticeForm = document.querySelector('.notice__form');
  var selectFormReset = selectNoticeForm.querySelector('.form__reset');

  function setAddress(x, y) {
    selectAddress.value = x + ', ' + y;
  }

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

  function setDefaultValueForm() {
    selectForm.reset();
    checkGuestsField();
    window.map.removePopup();
    window.pin.removeAll();
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
      setAddress(
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

  selectNoticeForm.addEventListener('submit', function (evt) {
    window.backend.sendForm(
        new FormData(selectNoticeForm),
        function () {
          selectNoticeForm.reset();
          setAddress(mapPinMain.offsetLeft, mapPinMain.offsetTop);
        },
        window.backend.showErrorMessage
    );
    evt.preventDefault();
  });

  selectRooms.addEventListener('change', checkGuestsField);
  selectFormReset.addEventListener('click', setDefaultValueForm);

  window.form = {

    setAddress: setAddress

  };
})();
