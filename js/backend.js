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
        onError('Статус ответа: ' + 'ошибка ' + xhr.status + ' ' + xhr.statusText);
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
    }, window.onErrorHandler);

    evt.preventDefault();
  };

  window.onErrorHandler = function (errorMessage) {
    var messageBlock = document.createElement('div');
    var message = document.createElement('p');
    var okButton = document.createElement('button');

    messageBlock.style = 'z-index: 10; width: 300px; height: 100px; margin: 0; text-align: center; background-color: white; border: 2px solid red';
    messageBlock.style.position = 'fixed';
    messageBlock.style.left = '40%';
    messageBlock.style.top = '50%';

    message.textContent = errorMessage;
    okButton.textContent = 'OK';

    messageBlock.insertAdjacentElement('afterbegin', okButton);
    messageBlock.insertAdjacentElement('afterbegin', message);
    document.body.insertAdjacentElement('afterbegin', messageBlock);

    okButton.addEventListener('click', function () {
      document.body.removeChild(messageBlock);
      okButton.removeEventListener('click');
    });
  };
})();
