'use strict';

(function () {
  var selectForm = document.querySelector('.notice__form');
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

  function guestsFieldCheckHandler() {
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

  function defaultValueFormHandler() {
    selectForm.reset();
    guestsFieldCheckHandler();
    window.card.popupRemoveHandler();
    window.pin.removeAll();
    window.map.setInactiveState();
  }

  function succsessSendFormHandler() {
    defaultValueFormHandler();
  }

  selectNoticeForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    var formData = new FormData(selectNoticeForm);
    window.backend.sendForm(formData, succsessSendFormHandler);
  });

  selectRooms.addEventListener('change', guestsFieldCheckHandler);
  selectFormReset.addEventListener('click', defaultValueFormHandler);

  window.form = {
    setAddress: setAddress
  };
})();
