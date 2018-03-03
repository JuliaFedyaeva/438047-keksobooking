'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';
  var URL_DATA = URL + '/data';
  var TIMEOUT = 10000;
  var RESPONSE_TYPE = 'json';
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
    var onError = params.onError || window.message.showError;
    var data = params.data;

    var xhr = new XMLHttpRequest();
    xhr.timeout = TIMEOUT;
    xhr.responseType = RESPONSE_TYPE;

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

  function loadOffers(onSuccess, onError) {
    sendRequestOnServer({
      method: METHODS.GET,
      url: URL_DATA,
      onSuccess: onSuccess,
      onError: onError
    });
  }

  window.backend = {
    sendForm: sendForm,
    loadOffers: loadOffers
  };
})();
