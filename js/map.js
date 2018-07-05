'use strict';

(function () {
  var map = document.querySelector('.map');
  var Y_BORDER_TOP = 130;
  var Y_BORDER_BOTTOM = 630;
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 80;

  window.map = {
    map: map,
    X_BORDER_LEFT: map.offsetLeft,
    X_BORDER_RIGHT: map.offsetLeft + map.clientWidth,
    Y_BORDER_TOP: Y_BORDER_TOP,
    Y_BORDER_BOTTOM: Y_BORDER_BOTTOM,
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    topBorderOfPin: Y_BORDER_TOP + (MAIN_PIN_HEIGHT / 2),
    bottomDorderOfPin: Y_BORDER_BOTTOM - (MAIN_PIN_HEIGHT / 2),

    activateMap: function () {
      window.map.map.classList.remove('map--faded');
      window.form.adForm.classList.remove('ad-form--disabled');
      window.instruments.removeAttribute(window.form.formElement, 'disabled');
    },

    deactivateMap: function () {
      window.map.map.classList.add('map--faded');
      window.form.adForm.classList.add('ad-form--disabled');
      window.instruments.setAttribute(window.form.formElement, 'disabled');
    }
  };
})();
