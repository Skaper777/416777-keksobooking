'use strict';

var type = document.querySelector('#type');

var price = document.querySelector('#price');

var rooms = document.querySelector('#room_number');

var capacity = document.querySelector('#capacity');

var timeIn = document.querySelector('#timein');
var valueOfTimeIn = ['12:00', '13:00', '14:00'];

var timeOut = document.querySelector('#timeout');
var valueOfTimeOut = ['12:00', '13:00', '14:00'];

var typesLocal = {
  'Flat': 'Квартира',
  'House': 'Дом',
  'Bungalo': 'Бунгало',
  'Palace': 'Дворец'
};

var adForm = document.querySelector('.ad-form');
var formElement = document.querySelectorAll('.ad-form__element');
var addressField = document.querySelector('#address');

var getAddress = function () {
  var pinX = parseInt(window.mapPins.mainPin.style.left, 10) + window.mapPins.MAIN_PIN_WIDTH / 2;
  var pinY = parseInt(window.mapPins.mainPin.style.top, 10) + window.mapPins.MAIN_PIN_HEIGHT;

  addressField.value = Math.round(pinX) + ', ' + Math.round(pinY);
};

(function () {
  window.form = {
    typesLocal: typesLocal,
    adForm: adForm,
    formElement: formElement,
    getAddress: getAddress
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
    adForm.reset();
    getAddress();
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
    switch (type.value) {
      case 'flat':
        price.min = valuesOfTypes.flat.min;
        price.placeholder = valuesOfTypes.flat.placeholder;
        return;
      case 'house':
        price.min = valuesOfTypes.house.min;
        price.placeholder = valuesOfTypes.house.placeholder;
        return;
      case 'palace':
        price.min = valuesOfTypes.palace.min;
        price.placeholder = valuesOfTypes.palace.placeholder;
        return;
      default:
        price.min = valuesOfTypes.bungalo.min;
        price.placeholder = valuesOfTypes.bungalo.placeholder;
        return;
    }
  };

  var onSynchTime = function (e) {
    var syncField = e.target === timeIn ? timeOut : timeIn;
    window.instruments.synchronizeFields(e.target, syncField, valueOfTimeIn, valueOfTimeOut, window.instruments.synch);
  };

  var onSynchRooms = function () {
    var selectedRooms = +(rooms.value);
    var selectedCapacity = +(capacity.value);
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

    capacity.setCustomValidity(message);
  };

  formResetButton.addEventListener('click', formReset);
  type.addEventListener('change', onSynchTypes);
  rooms.addEventListener('change', onSynchRooms);
  capacity.addEventListener('change', onSynchRooms);
  timeIn.addEventListener('change', onSynchTime);
  timeOut.addEventListener('change', onSynchTime);

  adForm.addEventListener('submit', window.onSuccessHandler);
})();
