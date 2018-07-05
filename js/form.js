'use strict';

(function () {
  window.form = {
    type: document.querySelector('#type'),
    valueOfType: ['flat', 'bungalo', 'house', 'palace'],

    price: document.querySelector('#price'),

    rooms: document.querySelector('#room_number'),

    capacity: document.querySelector('#capacity'),

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
    addressField: document.querySelector('#address'),

    getAddress: function () {
      var pinX = parseInt(window.mapPins.mainPin.style.left, 10) + window.map.MAIN_PIN_WIDTH / 2;
      var pinY = parseInt(window.mapPins.mainPin.style.top, 10) + window.map.MAIN_PIN_HEIGHT / 2;

      this.addressField.value = Math.round(pinX) + ', ' + Math.round(pinY);
    }
  };

  var formResetButton = document.querySelector('.ad-form__reset');
  var formReset = function (evt) {
    evt.preventDefault();

    if (document.querySelector('.map__card')) {
      window.ads.closePopup();
    }
    window.map.deactivateMap();
    window.mapPins.removePins();
    window.mapPins.resetMainPin();
    window.form.adForm.reset();
    window.form.getAddress();
  };

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
    var selectedRooms = +(window.form.rooms.value);
    var selectedCapacity = +(window.form.capacity.value);
    var message = '';

    switch (selectedRooms) {
      case (1): {
        if (selectedCapacity > 1 || selectedCapacity === 0) {
          message = '1 комната для 1 гостя';
        }
        break;
      }
      case (2): {
        if (selectedCapacity > 2 || selectedCapacity === 0) {
          message = '2 комнаты для 1 гостя или для 2 гостей';
        }
        break;
      }
      case (3): {
        if (selectedCapacity > 3 || selectedCapacity === 0) {
          message = '3 комнаты для 1 гостя или для 2 гостей или для 3 гостей';
        }
        break;
      }
      case (100): {
        if (selectedCapacity > 0) {
          message = '100 комнат не для гостей';
        }
        break;
      }
    }

    window.form.capacity.setCustomValidity(message);
  };

  formResetButton.addEventListener('click', formReset);
  window.form.type.addEventListener('change', onSynchTypes);
  window.form.rooms.addEventListener('change', onSynchRooms);
  window.form.capacity.addEventListener('change', onSynchRooms);
  window.form.timeIn.addEventListener('change', onSynchTime);
  window.form.timeOut.addEventListener('change', onSynchTime);

  window.form.adForm.addEventListener('submit', window.onSuccessHandler);
})();
