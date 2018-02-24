'use strict';

(function() {

  function window.data.getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function window.data.getShuffleArray(array) {
    var copyArray = array.slice();

    for (var i = copyArray.length - 1; i > 0; i--) {
      var randomIndex = Math.floor(Math.random() * (i + 1));
      var tempValue = copyArray[i];
      copyArray[i] = copyArray[randomIndex];
      copyArray[randomIndex] = tempValue;
    }
    return copyArray;
  }

  function window.data.getRandomElement(array) {
    var randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  function window.data.getArraySlice(array) {
    var randomIndex = Math.floor(Math.random() * (array.length + 1));
    return array.slice(randomIndex, array.length);
  }

  function window.data.getAvatarURL(id) {
    if (id < 10) {
      id = '0' + id;
    }
    return 'img/avatars/user' + id + '.png';
  }

})();
