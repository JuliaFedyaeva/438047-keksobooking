'use strict';

(function () {

  var SAVE = 'https://js.dump.academy/keksobooking';
  var ONLOAD = 'https://js.dump.academy/keksobooking/data';
  var TIMEOUT = 10000;
  var STATUS = {
    ok: 200,
    badRequest: 400,
    notFound: 404
  };

  function sendRequestOnServer(metod, url, onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case STATUS.ok:
          onSuccess(xhr.response);
          break;
        case STATUS.badRequest:
          error = 'Неверный запрос';
          break;
        case STATUS.notFound:
          error = 'Ничего не найдено';
          break;
        default:
          error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.open(metod, url);
    xhr.send(data);
  }

  function saveForm(onSuccess, onError, data) {
    sendRequestOnServer('POST', SAVE, onSuccess, onError, data);
  }

  function loadData(onSuccess, onError) {
    sendRequestOnServer('GET', ONLOAD, onSuccess, onError);
  }

  function getErrorRequest(errorMessage) {
    var node = document.createElement('div');
    var button = document.createElement('button');
    document.body.insertAdjacentElement('afterbegin', node);
    node.style = 'z-index: 100; text-align: center; background-color: #fff; color: #ff0033; padding: 30px;';
    node.style.position = 'fixed';
    node.style.width = '30vw';
    node.style.left = '50%';
    node.style.top = '17vw';
    node.style.fontSize = '30px';
    node.innerHTML = '<p>' + errorMessage + '</p>';
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

  window.backend = {
    saveForm: saveForm,
    loadData: loadData,
    getErrorRequest: getErrorRequest
  };

})();
