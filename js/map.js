'use strict';

(function () {
  window.map = {
    map: document.querySelector('.map'),
    X_BORDER_LEFT: window.map.map.offsetLeft,
    X_BORDER_RIGHT: window.map.map.offsetLeft + window.map.map.width,
    Y_ROOF: 130,
    Y_FLOOR: 630,

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
