'use strict';

(function() {

  window.data ={

    getRandomNumber: function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

    getShuffleArray: function getShuffleArray(array) {
    var copyArray = array.slice();

    for (var i = copyArray.length - 1; i > 0; i--) {
      var randomIndex = Math.floor(Math.random() * (i + 1));
      var tempValue = copyArray[i];
      copyArray[i] = copyArray[randomIndex];
      copyArray[randomIndex] = tempValue;
    }
    return copyArray;
  },

    getRandomElement: function getRandomElement(array) {
    var randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  },

    getArraySlice: function getArraySlice(array) {
    var randomIndex = Math.floor(Math.random() * (array.length + 1));
    return array.slice(randomIndex, array.length);
  },

    getAvatarURL: function getAvatarURL(id) {
    if (id < 10) {
      id = '0' + id;
    }
    return 'img/avatars/user' + id + '.png';
  }

};
})();
