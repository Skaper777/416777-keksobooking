'use strict';

(function () {
  var map = document.querySelector('.map');

  window.map = {
    map: map,
    X_BORDER_LEFT: map.offsetLeft,
    X_BORDER_RIGHT: map.offsetLeft + map.clientWidth,
    Y_ROOF: 80 + window.mapPins.mainPin.offsetHeight,
    Y_FLOOR: 629 - window.mapPins.mainPin.offsetHeight,

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
