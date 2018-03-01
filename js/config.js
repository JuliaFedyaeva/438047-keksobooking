'use strict';

(function () {

  window.CONFIG = {
    USERS: 8,

    MIN_GUEST: 1,
    MAX_GUEST: 20,

    MIN_PRICE: 1000,
    MAX_PRICE: 1000000,

    MIN_QUANTITY_OF_ROOMS: 1,
    MAX_QUANTITY_OF_ROOMS: 5,

    PIN: {
      X: {
        MIN: 300,
        MAX: 900
      },
      Y: {
        MIN: 100,
        MAX: 500
      },
      HEIGHT: 75,
      WIDTH: 56,
      RADIUS: 31,
      BOTTOM_PART: 22
    },

    MAP: {
      LIMIT: {
        TOP: 100
      }
    },

    KEY_CODES: {
      ESC: 27
    },

    TITLES_ADS: [
      'Большая уютная квартира',
      'Маленькая неуютная квартира',
      'Огромный прекрасный дворец',
      'Маленький ужасный дворец',
      'Красивый гостевой домик',
      'Некрасивый негостеприимный домик',
      'Уютное бунгало далеко от моря',
      'Неуютное бунгало по колено в воде'
    ],

    TYPES_OF_ROOMS: [
      'flat',
      'house',
      'bungalo'
    ],

    CHECK_IN_OUT_TIME: [
      '12:00',
      '13:00',
      '14:00'
    ],

    FEATURES: [
      'wifi',
      'dishwasher',
      'parking',
      'elevator',
      'conditioner'
    ],

    PHOTOS: [
      'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
    ]
  };
})();
