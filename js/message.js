'use strict';

(function () {
  function showError(message) {
    var node = document.createElement('div');
    var button = document.createElement('button');
    document.body.insertAdjacentElement('afterbegin', node);
    node.style = 'z-index: 100; text-align: center; background-color: #fff; color: #ff0033; padding: 30px;';
    node.style.position = 'fixed';
    node.style.width = '30vw';
    node.style.left = '50%';
    node.style.top = '50%';
    node.style.fontSize = '30px';
    node.innerHTML = '<p>' + message + '</p>';
    node.style.borderRadius = '3px';
    node.style.boxShadow = '0 0 100px #000';
    node.style.transform = 'translate(-50%, -50%)';
    button.textContent = 'OK';
    button.style = 'width: 200px; margin: 20px auto 0; padding: 15px;  color: #fff; background-color: #577500; border: none; border-radius: 2px; cursor: pointer;';
    node.appendChild(button);
    button.addEventListener('click', function () {
      document.body.removeChild(node);
    });
  }

  window.message = {
    showError: showError
  };
})();
