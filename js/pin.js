'use strict';

(function() {
  window.pin ={

    generateAndRenderPins: function generateAndRenderPins(pinsData) {
    var pinsContainer = document.querySelector('.map__pins');
    var pinsFragment = document.createDocumentFragment();
    var pinsTemplate = document.querySelector('template').content.querySelector('.map__pin');

    for (var i = 0; i < pinsData.length; i++) {
      var pin = pinsTemplate.cloneNode(true);
      var pinImg = pin.querySelector('img');

      pin.style.left = pinsData[i].location.x + 'px';
      pin.style.top = pinsData[i].location.y + 'px';
      pinImg.src = pinsData[i].author.avatar;
      pin.dataset.id = i;
      pinsFragment.appendChild(pin);
    }
    pinsContainer.appendChild(pinsFragment);
    }
  };

})();

