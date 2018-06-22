'use strict';

(function () {
  window.data = '';

  var onSuccessHandlerObj = function (arr) {
    window.data = arr;

    return window.data;
  };

  window.backend.download(onSuccessHandlerObj, window.errorHandler);
})();
