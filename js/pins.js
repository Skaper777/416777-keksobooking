'use strict';

(function () {
  window.mapPins = {
    renderPins: function (arr) {
      var fragment = document.createDocumentFragment();
      var slicedArr = arr.slice(0, NUMBER_OF_PINS);

      slicedArr.forEach(function (array, i) {
        fragment.appendChild(renderMapPin(arr[i], i));
      });

      pinsContainer.appendChild(fragment);
    },

    removePins: function () {
      var pins = pinsContainer.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var j = 0; j < pins.length; j++) {
        pinsContainer.removeChild(pins[j]);
      }
    },

    resetMainPin: function () {
      mainPin.style.left = startCoords.x + 'px';
      mainPin.style.top = startCoords.y + 'px';
    }
  };

  var NUMBER_OF_PINS = 5;
  var MAIN_PIN_WIDTH = 60;
  var MAIN_PIN_HEIGHT = 60;
  var pin;
  var pinsContainer = document.querySelector('.map__pins');
  var pins = pinsContainer.querySelectorAll('.map__pin:not(.map__pin--main)');
  var mainPin = document.querySelector('.map__pin--main');

  var startCoords = {
    x: mainPin.offsetLeft + MAIN_PIN_WIDTH / 2,
    y: mainPin.offsetTop + MAIN_PIN_HEIGHT
  };

  var renderMapPin = function (obj, objIndex) {
    var PIN_WIDTH = 40;
    var PIN_HEIGTH = 40;
    var btn = document.createElement('button');
    var img = document.createElement('img');

    btn.classList.add('map__pin');
    btn.dataset.index = objIndex;
    btn.style.left = obj.location.x - PIN_WIDTH / 2 + 'px';
    btn.style.top = obj.location.y - PIN_HEIGTH + 'px';
    img.width = PIN_WIDTH;
    img.height = PIN_HEIGTH;
    img.src = obj.author.avatar;
    img.alt = obj.offer.title;
    btn.appendChild(img);

    btn.addEventListener('click', function () {
      window.ads.showCard(window.map.map, window.data[objIndex]);
    });

    btn.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.ads.ENTER) {
        window.ads.showCard(window.map.map, window.data[objIndex]);
      }
    });

    return btn;
  };

  var mainPinHandler = function (evt) {
    evt.preventDefault();

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: moveEvt.pageX - startCoords.x,
        y: moveEvt.pageY - startCoords.y
      };

      startCoords = {
        x: moveEvt.pageX,
        y: moveEvt.pageY
      };

      if (startCoords.y >= window.map.Y_ROOF && startCoords.y <= window.map.Y_FLOOR && startCoords.x >= window.map.X_BORDER_LEFT && startCoords.x <= window.map.X_BORDER_RIGHT) {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      }

      window.form.getAddress(startCoords.x - 350, startCoords.y);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      window.map.map.removeEventListener('mousemove', onMouseMove);
      window.map.map.removeEventListener('mouseup', onMouseUp);
    };

    pins = pinsContainer.querySelectorAll('.map__pin');

    for (var i = 1; i < pins.length; i++) {
      pin = pins[i];
    }

    if (!pin) {
      window.backend.download(window.mapPins.renderPins, window.errorHandler);
    }
    window.map.activateMap();
    window.form.getAddress(startCoords.x - 350, startCoords.y);

    window.map.map.addEventListener('mousemove', onMouseMove);
    window.map.map.addEventListener('mouseup', onMouseUp);
  };

  window.form.getAddress(startCoords.x, startCoords.y);
  mainPin.addEventListener('mousedown', mainPinHandler);
})();
