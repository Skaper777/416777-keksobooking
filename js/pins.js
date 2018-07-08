'use strict';

(function () {
  var NUMBER_OF_PINS = 5;

  var Y_BORDER_TOP = 130;
  var Y_BORDER_BOTTOM = 630;
  var X_BORDER_LEFT = 0;
  var X_BORDER_RIGHT = X_BORDER_LEFT + window.map.map.clientWidth;

  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 80;

  var PIN_BORDER_TOP = Y_BORDER_TOP - MAIN_PIN_HEIGHT;
  var PIN_BORDER_BOTTOM = Y_BORDER_BOTTOM - MAIN_PIN_HEIGHT;
  var PIN_BORDER_LEFT = X_BORDER_LEFT - (MAIN_PIN_WIDTH / 2);
  var PIN_BORDER_RIGHT = X_BORDER_RIGHT - (MAIN_PIN_WIDTH / 2);

  var pinsContainer = document.querySelector('.map__pins');
  var pins = pinsContainer.querySelectorAll('.map__pin:not(.map__pin--main)');
  var mainPin = document.querySelector('.map__pin--main');

  var renderPins = function (arr) {
    var fragment = document.createDocumentFragment();
    var slicedArr = arr.slice(0, NUMBER_OF_PINS);

    slicedArr.forEach(function (array, i) {
      fragment.appendChild(renderMapPin(arr[i], i));
    });

    pinsContainer.appendChild(fragment);
  };

  var removePins = function () {
    pins = pinsContainer.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var j = 0; j < pins.length; j++) {
      pinsContainer.removeChild(pins[j]);
    }
  };

  var resetMainPin = function () {
    window.mapPins.mainPin.style = 'left: 570px; top: 375px;';
  };

  window.mapPins = {
    mainPin: mainPin,
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,

    renderPins: renderPins,
    removePins: removePins,
    resetMainPin: resetMainPin
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

  var OnMainPinMouseDown = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.pageX,
      y: evt.pageY
    };

    var onDocumentMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.pageX,
        y: startCoords.y - moveEvt.pageY
      };

      startCoords = {
        x: moveEvt.pageX,
        y: moveEvt.pageY
      };

      if (mainPin.offsetLeft - shift.x < PIN_BORDER_LEFT) {
        mainPin.style.left = PIN_BORDER_LEFT + 'px';
      } else if (mainPin.offsetLeft - shift.x > PIN_BORDER_RIGHT) {
        mainPin.style.left = PIN_BORDER_RIGHT + 'px';
      } else {
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      }

      if (mainPin.offsetTop - shift.y > PIN_BORDER_BOTTOM) {
        mainPin.style.top = PIN_BORDER_BOTTOM + 'px';
      } else if (mainPin.offsetTop - shift.y < PIN_BORDER_TOP) {
        mainPin.style.top = PIN_BORDER_TOP + 'px';
      } else {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      }

      window.form.getAddress();
    };

    var onDocumentMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onDocumentMouseMove);
      document.removeEventListener('mouseup', onDocumentMouseUp);
    };

    window.backend.download(renderPins, window.errorHandler);
    window.map.activateMap();
    window.form.getAddress();

    document.addEventListener('mousemove', onDocumentMouseMove);
    document.addEventListener('mouseup', onDocumentMouseUp);
  };

  window.form.getAddress();
  mainPin.addEventListener('mousedown', OnMainPinMouseDown);
})();
