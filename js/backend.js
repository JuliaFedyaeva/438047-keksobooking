'use strict';

(function () {

  var URL = 'https://js.dump.academy/keksobooking';
  var URL_DATA = URL + '/data';
  var TIMEOUT = 10000;
  var STATUS = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404
  };

  var METHODS = {
    GET: 'GET',
    POST: 'POST'
  };

  function sendRequestOnServer(params) {
    var method = params.method || METHODS.GET;
    var url = params.url || URL;
    var onSuccess = params.onSuccess;
    var onError = params.onError;
    var data = params.data;

    var xhr = new XMLHttpRequest();
    xhr.timeout = TIMEOUT;
    xhr.responseType = 'json';

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });


    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case STATUS.OK:
          onSuccess(xhr.response);
          break;
        case STATUS.BAD_REQUEST:
          error = 'Неверный запрос';
          break;
        case STATUS.NOT_FOUND:
          error = 'Ничего не найдено';
          break;
        default:
          error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.open(method, url);
    xhr.send(data);
  }

  function sendForm(data, onSuccess, onError) {
    sendRequestOnServer({
      method: METHODS.POST,
      onSuccess: onSuccess,
      onError: onError,
      data: data
    });
  }

  function loadData(onSuccess, onError) {
    sendRequestOnServer({
      method: METHODS.GET,
      url: URL_DATA,
      onSuccess: onSuccess,
      onError: onError
    });
  }

  function showErrorMessage(message) {
    var node = document.createElement('div');
    var button = document.createElement('button');
    document.body.insertAdjacentElement('afterbegin', node);
    node.style = 'z-index: 100; text-align: center; background-color: #fff; color: #ff0033; padding: 30px;';
    node.style.position = 'fixed';
    node.style.width = '30vw';
    node.style.left = '50%';
    node.style.top = '17vw';
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

  window.backend = {

    sendForm: sendForm,

    loadData: loadData,

    showErrorMessage: showErrorMessage

  };
})();
