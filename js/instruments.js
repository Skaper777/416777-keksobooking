'use strict';

(function () {
  window.instruments = {
    getRandomValue: function (min, max) {
      return Math.round((Math.random() * (max - min)) + min);
    },

    getRandomMassiveElement: function (arr) {
      return arr[window.instruments.getRandomValue(0, arr.length - 1)];
    },

    getRandomLength: function (arr) {
      var newArr = arr.slice();
      newArr.length = window.instruments.getRandomValue(1, newArr.length);

      return newArr;
    },

    getShuffleElements: function (arr) {
      for (var i = 0; i < arr.length; i++) {
        var rand = Math.floor(Math.random() * (i + 1));
        var temp = arr[i];
        arr[i] = arr[rand];
        arr[rand] = temp;
      }

      return arr;
    },

    setAttribute: function (selector, attribute) {
      for (var i = 0; i < selector.length; i++) {
        selector[i].setAttribute(attribute, 0);
      }
    },

    removeAttribute: function (selector, attribute) {
      for (var i = 0; i < selector.length; i++) {
        selector[i].removeAttribute(attribute);
      }
    },

    synchronizeFields: function (element1, element2, values1, values2, callback) {
      var index = values1.indexOf(element1.value);
      callback(element2, values2[index]);
    },

    synch: function (element, value) {
      element.value = value;
    },

    synchWithMin: function (element, value) {
      element.min = value;
      element.value = value;
    }
  };
})();
