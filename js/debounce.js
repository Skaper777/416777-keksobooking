'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 300;

  window.debounce = function (action) {
    var lastTimeout;

    return function () {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(action, DEBOUNCE_INTERVAL);
    };
  };
})();
