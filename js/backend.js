'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';

  var request = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка ' + xhr.status);
    });
    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    return xhr;
  };

  window.backend = {
    upload: function (data, onLoad, onError) {
      var xhr = request(onLoad, onError);

      xhr.open('POST', URL);
      xhr.send(data);
    },
    download: function (onLoad, onError) {
      var xhr = request(onLoad, onError);

      xhr.open('GET', URL + '/data');
      xhr.send();
    }
  };

  window.onSuccessHandler = function (evt) {
    window.backend.upload(new FormData(window.form.adForm), function () {
      window.form.adForm.reset();
    });

    evt.preventDefault();
  };

  window.onErrorHandler = function (errorMessage) {
    var message = document.createElement('div');
    message.style = 'z-index: 10; width: 400px; height: 200px; margin: 0 auto; text-align: center;';
    message.style.position = 'absolute';
    message.style.left = '50%';
    message.style.top = '50%';

    message.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', message);
  };
})();
