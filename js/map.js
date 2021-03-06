'use strict';

(function () {
  window.map = {
    map: document.querySelector('.map'),
    X_BORDER_LEFT: 350,
    X_BORDER_RIGHT: 1550,
    Y_ROOF: 130,
    Y_FLOOR: 630,

    activateMap: function () {
      window.map.map.classList.remove('map--faded');
      window.form.adForm.classList.remove('ad-form--disabled');
      window.instruments.removeAttribute(window.form.formElement, 'disabled');
    }
  };
})();
