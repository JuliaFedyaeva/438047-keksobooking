'use strict';

(function () {
  var typeOfTheHouse = document.querySelector('#housing-type');
  var priceOfTheHouse = document.querySelector('#housing-price');
  var roomsInTheHouse = document.querySelector('#housing-rooms');
  var guestsOnTheHouse = document.querySelector('#housing-guests');

function checkPrice(valueOfPrice, valueOfInput) {
  var rangeOfPrice = {

    'middle': function (price) {
      return price > 10000 && price < 50000;
      },

      'low': function (price) {
      return price < 10000;
      },

    'high': function (price) {
      return price > 50000;
    }
  };
  return rangeOfPrice[valueOfInput](valueOfPrice);
}

function filterHouse(elem) {
  return typeOfTheHouse.value === 'any' ? true : elem.offer.type === typeOfTheHouse.value;
}

function filterPrice(elem) {
  return priceOfTheHouse.value === 'any' ? true : checkPrice(elem.offer.price, priceOfTheHouse.value);
}

function filterRooms(elem) {
  return roomsInTheHouse.value === 'any' ? true : (elem.offer.rooms + '') === roomsInTheHouse.value;
}

function filterGuest(elem) {
  return guestsOnTheHouse.value === 'any' ? true : (elem.offer.guests + '') === guestsOnTheHouse.value;
}

function filterFeatures(elem, inputsChecked) {
  var features = elem.offer.features;
  inputsChecked.every(function (elemFeatures) {
    return features.indexOf(elemFeatures) !== -1;
  });
}

function getFeaturesChecked() {
  var inputsFeatures = document.querySelectorAll('#housing-features input');
  var inputsFeaturesArray = Array.prototype.slice.call(inputsFeatures);
  var inputsChecked = [];
  inputsFeaturesArray.reduce(function (previousData, item) {
    var valueInput = item.value;
    if (item.checked) {
      inputsChecked.push(valueInput);
    }
    }, 0);
  return inputsChecked;
}

function getFilteredArray(data, inputsChecked) {
  data.filter(filterHouse)
    .filter(filterPrice)
    .filter(filterRooms)
    .filter(filterGuest)
    .filter(function (elem) {
      return filterFeatures(elem, inputsChecked);
    });
}

function filteredData() {
  var advertsData = window.map.pins.slice();
  var inputsFeaturesChecked = getFeaturesChecked();
  getFilteredArray(advertsData, inputsFeaturesChecked);
}

window.filter = {

  filteredData: filteredData

};
})();
