'use strict';

(function () {
  var NUMBER_OF_PINS = 5;

  var pinsContainer = document.querySelector('.map__pins');
  var pins = pinsContainer.querySelectorAll('.map__pin:not(.map__pin--main)');


  window.mapPins = {
    mainPin: document.querySelector('.map__pin--main'),
    renderPins: function (arr) {
      var fragment = document.createDocumentFragment();
      var slicedArr = arr.slice(0, NUMBER_OF_PINS);

      slicedArr.forEach(function (array, i) {
        fragment.appendChild(renderMapPin(arr[i], i));
      });

      pinsContainer.appendChild(fragment);
    },

    removePins: function () {
      pins = pinsContainer.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var j = 0; j < pins.length; j++) {
        pinsContainer.removeChild(pins[j]);
      }
    },

    resetMainPin: function () {
      window.mapPins.mainPin.style = 'left: 570px; top: 375px;';
    }
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

      if (startCoords.y >= window.map.Y_ROOF && startCoords.y <= window.map.Y_FLOOR && startCoords.x >= window.map.X_BORDER_LEFT && startCoords.x <= window.map.X_BORDER_RIGHT) {
        window.mapPins.mainPin.style.top = (window.mapPins.mainPin.offsetTop - shift.y) + 'px';
        window.mapPins.mainPin.style.left = (window.mapPins.mainPin.offsetLeft - shift.x) + 'px';
      }

      window.form.getAddress();
    };

    var onDocumentMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onDocumentMouseMove);
      document.removeEventListener('mouseup', onDocumentMouseUp);
    };

    window.backend.download(window.mapPins.renderPins, window.errorHandler);
    window.map.activateMap();
    window.form.getAddress();

    document.addEventListener('mousemove', onDocumentMouseMove);
    document.addEventListener('mouseup', onDocumentMouseUp);
  };

  window.form.getAddress();
  window.mapPins.mainPin.addEventListener('mousedown', OnMainPinMouseDown);
})();
