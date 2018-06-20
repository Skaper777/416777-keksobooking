'use strict';

(function () {
  var pins;
  var pin;

  var mainPin = document.querySelector('.map__pin--main');
  var pinsContainer = document.querySelector('.map__pins');

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
      window.ads.showCard(window.map.map, window.data.adArray[objIndex]);
    });

    btn.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.data.ENTER) {
        window.ads.showCard(window.map.map, window.data.adArray[objIndex]);
      }
    });

    return btn;
  };

  var renderPins = function (arr) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < arr.length; i++) {
      fragment.appendChild(renderMapPin(arr[i], i));
    }

    pinsContainer.appendChild(fragment);
  };

  var mainPinHandler = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.pageX,
      y: evt.pageY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.pageX,
        y: startCoords.y - moveEvt.pageY
      };

      startCoords = {
        x: moveEvt.pageX,
        y: moveEvt.pageY
      };

      if (startCoords.y >= window.map.Y_ROOF && startCoords.y <= window.map.Y_FLOOR && startCoords.x >= window.map.X_BORDER_LEFT && startCoords.x <= window.map.X_BORDER_RIGHT) {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      }

      window.form.getAddress(startCoords.x, startCoords.y);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    pins = pinsContainer.querySelectorAll('.map__pin');

    for (var i = 1; i < pins.length; i++) {
      pin = pins[i];
    }

    if (!pin) {
      renderPins(window.data.adArray);
    }
    window.map.activateMap();
    window.form.getAddress(startCoords.x, startCoords.y);

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  mainPin.addEventListener('mousedown', mainPinHandler);
})();
