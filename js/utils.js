'use strict';

(function () {
  var KEY_CODES = {
    ESC: 27,
    ENTER: 13
  };

  function isEscEvent(evt, action) {
    if (evt.keyCode === KEY_CODES.ESC) {
      action();
    }
  }

  function isEnterEvent(evt, action) {
    if (evt.keyCode === KEY_CODES.ENTER) {
      action();
    }
  }

  window.utils = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent
  };
})();
