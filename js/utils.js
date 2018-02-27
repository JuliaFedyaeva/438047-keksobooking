'use strict';

(function () {

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getShuffleArray(array) {
    var copyArray = array.slice();

    for (var i = copyArray.length - 1; i > 0; i--) {
      var randomIndex = Math.floor(Math.random() * (i + 1));
      var tempValue = copyArray[i];
      copyArray[i] = copyArray[randomIndex];
      copyArray[randomIndex] = tempValue;
    }
    return copyArray;
  }

  function getRandomElement(array) {
    var randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  function getArraySlice(array) {
    var randomIndex = Math.floor(Math.random() * (array.length + 1));
    return array.slice(randomIndex, array.length);
  }

  function isEscEvent(evt, action) {
    if (evt.keycode === window.CONFIG.KEY_CODES.ESC) {
      action();
    }
  }

  window.utils = {

    getRandomNumber: getRandomNumber,

    getShuffleArray: getShuffleArray,

    getRandomElement: getRandomElement,

    getArraySlice: getArraySlice,

    isEscEvent: isEscEvent

  };
})();
