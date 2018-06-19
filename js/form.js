'use strict';

(function () {
  window.form = {
    adForm: document.querySelector('.ad-form'),
    formElement: document.querySelectorAll('.ad-form__element'),
    getAddress: function (x, y) {
      addressField.value = x + ', ' + y;
      return addressField.value;
    }
  };

  var addressField = document.querySelector('#address');

  var onSynchTypes = function () {
    window.instruments.synchronizeFields(window.data.type, window.data.price, window.data.valueOfType, window.data.valueOfPrice, window.data.synchWithMin);
  };

  var onSynchTime = function (e) {
    var syncField = e.target === window.data.timeIn ? window.data.timeOut : window.data.timeIn;
    window.instruments.synchronizeFields(e.target, syncField, window.data.valueOfTimeIn, window.data.valueOfTimeOut, window.data.synch);
  };

  var onSynchRooms = function () {
    var value = (window.data.rooms.value === '100') ? '0' : window.data.rooms.value;
    for (var i = 0; i < window.data.capacity.children.length; i++) {
      if (window.data.capacity.children[i].value > value) {
        window.data.capacity.children[i].style.display = 'none';
      } else {
        window.data.capacity.children[i].style.display = 'initial';
      }

      if (window.data.capacity.children[i].value === '0') {
        window.data.capacity.children[i].style.display = (value === '0') ? 'initial' : 'none';
        window.data.capacity.selectedIndex = (value === '0') ? 3 : 2;
      }
    }
  };

  window.data.type.addEventListener('change', onSynchTypes);
  window.data.rooms.addEventListener('change', onSynchRooms);
  window.data.timeIn.addEventListener('change', onSynchTime);
  window.data.timeOut.addEventListener('change', onSynchTime);
})();
