'use strict';

(function () {
  var pinsData = [];

  function getById(id) {
    var filteredPins = pinsData.filter(function (data) {
      return data.id === parseInt(id, 10);
    });
    return filteredPins[0];
  }

  function getAll() {
    return pinsData.slice();
  }

  function getTo(index) {
    return pinsData.slice(0, index);
  }

  function getLength() {
    return pinsData.length;
  }

  function add(data) {
    if (data && data.length === 0) {
      return;
    }
    var lastIndex = getLength();

    for (var i = 0; i < data.length; i++) {
      data[i].id = lastIndex + i;
      pinsData.push(data[i]);
    }
  }

  function clear() {
    pinsData = [];
  }

  window.pinsData = {
    add: add,
    getById: getById,
    getAll: getAll,
    getTo: getTo,
    clear: clear
  };
})();
