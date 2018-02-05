'use strict';


var USERS = 8;

var MIN_GUEST = 1;
var MAX_GUEST = 20;

var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;

// var PIN_HEIGHT = 75;
// var PIN_WIDTH = 56;

var MIN_QUANTITY_OF_ROOMS = 1;
var MAX_QUANTITY_OF_ROOMS = 5;

var PIN_MIN_X = 300;
var PIN_MAX_X = 900;
var PIN_MIN_Y = 100;
var PIN_MAX_Y = 500;

var TITLES_ADS = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES_OF_ROOMS = ['flat', 'house', 'bungalo'];
var CHECK_IN_OUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'elevator', 'conditioner'];

// Удаляем класс .map-faded
document.querySelector('section').classList.remove('map--faded');

// Генерируем случайное число в диапазоне
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Генерируем массив в случайном порядке
function getShuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var randomIndex = Math.floor(Math.random() * (i + 1));
    var tempValue = array[i];
    array[i] = array[randomIndex];
    array[randomIndex] = tempValue;
  }
  return array;
}

// Генерируем случайный элемемент массива
function getRandomElement(array) {
  for (var i = 0; i < array.length; i++) {
    var randomIndex = Math.floor(Math.random() * array.length);
  }
  var randomElement = array[randomIndex];
  return randomElement;
}

// Создаем массив произвольной длины
function getArrayLength(array) {
  var clone = array.slice();
  clone.length = getRandomNumber(1, array.length);
  return clone;
}

// Генерирует массив аватарок
function generateAvatars() {
  var listOfAvatars = [];

  for (var i = 1; i < USERS + 1; i++) {
    if (i < 10) {
      i = '0' + i;
    }
    var avatars = 'img/avatars/user' + i + '.png';
    listOfAvatars.push(avatars);
  }
  return listOfAvatars;
}

// Функция возвращает массив объектов объявлений. Трэвис тоже матерится, но это пока что
function generateAds() {
  var ads = [];
  var userAvatar = getShuffleArray(generateAvatars());
  var titleOfAds = getShuffleArray(TITLES_ADS);

  for (var i = 0; i < USERS; i++) {
    var locationX = getRandomNumber(PIN_MIN_X, PIN_MAX_X);
    var locationY = getRandomNumber(PIN_MIN_Y, PIN_MAX_Y);

    ads.push({
      'author': {
        'avatar': userAvatar[i]
      },
      'offer': {
        'title': titleOfAds[i],
        'adress': (locationX + ', ' + locationY),
        'price': getRandomNumber(MIN_PRICE, MAX_PRICE),
        'type': getRandomElement(TYPES_OF_ROOMS),
        'rooms': getRandomNumber(MIN_QUANTITY_OF_ROOMS, MAX_QUANTITY_OF_ROOMS),
        'guests': getRandomNumber(MIN_GUEST, MAX_GUEST),
        'checkin': getRandomElement(CHECK_IN_OUT),
        'checkout': getRandomElement(CHECK_IN_OUT),
        'features': getArrayLength(FEATURES),
        'description': '',
        'photos': []
      },
      'location': {
        'x': locationX,
        'y': locationY
      }
    });
  }
  return ads;
}

