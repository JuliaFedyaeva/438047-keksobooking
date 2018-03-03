'use strict';

(function () {
  var typeOfTheHouse = document.querySelector('#housing-type');
  var priceOfTheHouse = document.querySelector('#housing-price');
  var roomsInTheHouse = document.querySelector('#housing-rooms');
  var guestsOnTheHouse = document.querySelector('#housing-guests');

  function checkPrice(valueOfPrice, valueOfInput) {
    var rangeOfPrice = {
      'middle': function (price) {
        return price >= 10000 && price <= 50000;
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
    return roomsInTheHouse.value === 'any' ? true : elem.offer.rooms === parseInt(roomsInTheHouse.value, 10);
  }

  function filterGuest(elem) {
    return guestsOnTheHouse.value === 'any' ? true : elem.offer.guests === parseInt(guestsOnTheHouse.value, 10);
  }

  function filterFeatures(elem, featuresChecked) {
    var features = elem.offer.features;

    if (features.length < featuresChecked.length) {
      return false;
    }
    return featuresChecked.every(function (feature) {
      return features.indexOf(feature) !== -1;
    });
  }

  function getFeaturesChecked() {
    var inputsFeatures = document.querySelectorAll('#housing-features input');
    return Array.prototype
        .reduce.call(inputsFeatures, function (accumulator, input) {
          if (input.checked) {
            accumulator.push(input.value);
            return accumulator;
          }
          return accumulator;
        }, []);
  }

  function getFiltered() {
    var pinsData = window.pinsData.getAll();
    var featuresChecked = getFeaturesChecked();

    return pinsData
        .filter(filterHouse)
        .filter(filterPrice)
        .filter(filterRooms)
        .filter(filterGuest)
        .filter(function (elem) {
          if (featuresChecked.length === 0) {
            return elem;
          }
          return filterFeatures(elem, featuresChecked);
        })
        .slice(0, window.CONFIG.MAX_PINS);
  }

  window.filter = {
    getFiltered: getFiltered
  };
})();
