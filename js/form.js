'use strict';

(function () {
  window.form = {
    type: document.querySelector('#type'),
    valueOfType: ['flat', 'bungalo', 'house', 'palace'],

    price: document.querySelector('#price'),

    rooms: document.querySelector('select[name="rooms"]'),

    capacity: document.querySelector('select[name="capacity"]'),

    timeIn: document.querySelector('#timein'),
    valueOfTimeIn: ['12:00', '13:00', '14:00'],

    timeOut: document.querySelector('#timeout'),
    valueOfTimeOut: ['12:00', '13:00', '14:00'],

    typesLocal: {
      'Flat': 'Квартира',
      'House': 'Дом',
      'Bungalo': 'Бунгало',
      'Palace': 'Дворец'
    },

    adForm: document.querySelector('.ad-form'),
    formElement: document.querySelectorAll('.ad-form__element'),

    getAddress: function () {
      addressField.value = (window.mapPins.mainPin.offsetLeft
        + Math.round(window.mapPins.mainPin.offsetWidth / 2)) + ', '
        + (window.mapPins.mainPin.offsetTop + Math.round(window.mapPins.mainPin.offsetHeight));
    }
  };

  var formResetButton = document.querySelector('.ad-form__reset');
  var formReset = function () {
    if (document.querySelector('.map__card')) {
      window.ads.closePopup();
    }
    window.map.deactivateMap();
    window.mapPins.removePins();
    window.mapPins.resetMainPin();
    window.form.adForm.reset();
    window.form.getAddress();
  };

  var addressField = document.querySelector('#address');

  var valuesOfTypes = {
    'flat': {
      min: '1000',
      placeholder: '1000'
    },
    'house': {
      min: '5000',
      placeholder: '5000'
    },
    'palace': {
      min: '10000',
      placeholder: '10000'
    },
    'bungalo': {
      min: '0',
      placeholder: '0'
    }
  };

  var onSynchTypes = function () {
    switch (window.form.type.value) {
      case 'flat':
        window.form.price.min = valuesOfTypes.flat.min;
        window.form.price.placeholder = valuesOfTypes.flat.placeholder;
        return;
      case 'house':
        window.form.price.min = valuesOfTypes.house.min;
        window.form.price.placeholder = valuesOfTypes.house.placeholder;
        return;
      case 'palace':
        window.form.price.min = valuesOfTypes.palace.min;
        window.form.price.placeholder = valuesOfTypes.palace.placeholder;
        return;
      default:
        window.form.price.min = valuesOfTypes.bungalo.min;
        window.form.price.placeholder = valuesOfTypes.bungalo.placeholder;
        return;
    }
  };

  var onSynchTime = function (e) {
    var syncField = e.target === window.form.timeIn ? window.form.timeOut : window.form.timeIn;
    window.instruments.synchronizeFields(e.target, syncField, window.form.valueOfTimeIn, window.form.valueOfTimeOut, window.instruments.synch);
  };

  var onSynchRooms = function () {
    var value = (window.form.rooms.value === '100') ? '0' : window.form.rooms.value;
    for (var i = 0; i < window.form.capacity.children.length; i++) {
      if (window.form.capacity.children[i].value > value) {
        window.form.capacity.children[i].style.display = 'none';
      } else {
        window.form.capacity.children[i].style.display = 'initial';
      }

      if (window.form.capacity.children[i].value === '0') {
        window.form.capacity.children[i].style.display = (value === '0') ? 'initial' : 'none';
        window.form.capacity.selectedIndex = (value === '0') ? 3 : 2;
      }
    }
  };

  formResetButton.addEventListener('click', formReset);
  window.form.type.addEventListener('change', onSynchTypes);
  window.form.rooms.addEventListener('change', onSynchRooms);
  window.form.timeIn.addEventListener('change', onSynchTime);
  window.form.timeOut.addEventListener('change', onSynchTime);

  window.form.adForm.addEventListener('submit', window.onSuccessHandler);
})();
