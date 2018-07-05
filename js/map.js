'use strict';

(function () {
  var map = document.querySelector('.map');
  var Y_BORDER_TOP = 130;
  var Y_BORDER_BOTTOM = 630;
  var OFFSET_OF_TOP = 50;

  window.map = {
    map: map,
    X_BORDER_LEFT: map.offsetLeft,
    X_BORDER_RIGHT: map.offsetLeft + map.clientWidth,
    Y_BORDER_TOP: Y_BORDER_TOP,
    Y_BORDER_BOTTOM: Y_BORDER_BOTTOM,
    OFFSET_OF_TOP: OFFSET_OF_TOP,
    topBorderOfPin: Y_BORDER_TOP + window.mapPins.mainPin.offsetHeight - OFFSET_OF_TOP,
    bottomDorderOfPin: Y_BORDER_BOTTOM - window.mapPins.mainPin.offsetHeight,

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
