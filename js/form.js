'use strict';

(function () {
  window.form = {
    type: document.querySelector('#type'),
    valueOfType: ['flat', 'bungalo', 'house', 'palace'],

    price: document.querySelector('#price'),
    valueOfPrice: ['1000', '0', '5000', '10000'],

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

    getAddress: function (x, y) {
      addressField.value = x + ', ' + y;
      return addressField.value;
    }
  };

  var addressField = document.querySelector('#address');

  var onSynchTypes = function () {
    window.instruments.synchronizeFields(window.form.type, window.form.price, window.form.valueOfType, window.form.valueOfPrice, window.instruments.synchWithMin);
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

  window.form.type.addEventListener('change', onSynchTypes);
  window.form.rooms.addEventListener('change', onSynchRooms);
  window.form.timeIn.addEventListener('change', onSynchTime);
  window.form.timeOut.addEventListener('change', onSynchTime);

  window.form.adForm.addEventListener('submit', window.onSuccessHandler);
})();
