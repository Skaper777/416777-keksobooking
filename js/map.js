'use strict';

var map = document.querySelector('.map');

var getRandomValue = function (min, max) {
  return Math.round((Math.random() * (max - min)) + min);
};

var getRandomMassiveElement = function (arr) {
  return arr[getRandomValue(0, arr.length - 1)];
};

var getRandomLength = function (arr) {
  var newArr = arr.slice();
  newArr.length = getRandomValue(1, newArr.length);

  return newArr;
};

var getShuffleElements = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    var rand = Math.floor(Math.random() * (i + 1));
    var temp = arr[i];
    arr[i] = arr[rand];
    arr[rand] = temp;
  }

  return arr;
};

var titles = ['Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'];

var type = document.querySelector('#type');
var valueOfType = ['flat', 'bungalo', 'house', 'palace'];

var price = document.querySelector('#price');
var valueOfPrice = ['1000', '0', '5000', '10000'];

var rooms = document.querySelector('select[name="rooms"]');

var capacity = document.querySelector('select[name="capacity"]');

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
var features = ['wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var address = [getRandomValue(300, 900), getRandomValue(130, 630)];
var adArray = [];

var ENTER = 13;
var ESC = 27;

var createAdsArray = function (number) {
  for (var i = 0; i < number; i++) {
    adArray[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },

      offer: {
        title: titles[i],
        address: address.toString(),
        price: getRandomValue(1000, 1000000),
        type: getRandomMassiveElement(valueOfType),
        rooms: getRandomValue(1, 5),
        guests: getRandomValue(1, 100),
        checkin: getRandomMassiveElement(valueOfTimeIn),
        checkout: getRandomMassiveElement(valueOfTimeOut),
        features: getRandomLength(features),
        description: '',
        photos: getShuffleElements(photos)
      },

      location: {
        x: getRandomValue(300, 900),
        y: getRandomValue(130, 630)
      }
    };
  }

  return adArray;
};

createAdsArray(8);

// ---------------2--------------- //

var renderMapPin = function (obj, objIndex) {
  var PIN_WIDTH = 40;
  var PIN_HEIGTH = 40;
  var btn = document.createElement('button');
  var img = document.createElement('img');

  btn.classList.add('map__pin');
  btn.dataset.index = obj.index;
  btn.style.left = obj.location.x - PIN_WIDTH / 2 + 'px';
  btn.style.top = obj.location.y - PIN_HEIGTH + 'px';
  img.width = PIN_WIDTH;
  img.height = PIN_HEIGTH;
  img.src = obj.author.avatar;
  img.alt = obj.offer.title;
  btn.appendChild(img);

  btn.addEventListener('click', function () {
    showCard(map, adArray[objIndex]);
  });

  btn.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER) {
      showCard(map, adArray[objIndex]);
    }
  });

  return btn;
};

var pinsContainer = map.querySelector('.map__pins');

var renderPins = function (arr) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderMapPin(arr[i], i));
  }

  pinsContainer.appendChild(fragment);
};

// -------------3------------- //

var renderMapCard = function (obj) {
  var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
  var mapCard = mapCardTemplate.cloneNode(true);
  var fragment = document.createDocumentFragment();

  var popupPhotos = mapCard.querySelector('.popup__photos');
  var popupFeatures = mapCard.querySelector('.popup__features');

  var popupClose = mapCard.querySelector('.popup__close');

  mapCard.querySelector('.popup__title').textContent = obj.offer.title;
  mapCard.querySelector('.popup__text--address').textContent = obj.offer.address;
  mapCard.querySelector('.popup__text--price').textContent = obj.offer.price + '₽/ночь';
  mapCard.querySelector('.popup__type').textContent = typesLocal[obj.offer.type];
  mapCard.querySelector('.popup__text--capacity').textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
  mapCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;
  mapCard.querySelector('.popup__description').textContent = obj.offer.description;
  mapCard.querySelector('.popup__avatar').src = obj.author.avatar;

  for (var j = 0; j < obj.offer.photos.length; j++) {
    var photo = document.createElement('img');
    photo.src = obj.offer.photos[j];
    photo.classList.add('popup__photo');
    photo.alt = 'Фотография жилья';
    photo.width = 45;
    photo.height = 40;
    fragment.appendChild(photo);
  }

  popupPhotos.innerHTML = '';
  popupPhotos.appendChild(fragment);

  for (var i = 0; i < obj.offer.features.length; i++) {
    var feature = document.createElement('li');
    feature.classList.add('popup__feature');
    feature.classList.add('popup__feature--' + obj.offer.features[i]);
    fragment.appendChild(feature);
  }

  popupFeatures.innerHTML = '';
  popupFeatures.appendChild(fragment);

  popupClose.addEventListener('click', closePopup);
  popupClose.addEventListener('keydown', closeEscHandler);
  popupClose.addEventListener('keydown', closeEnterHandler);

  return mapCard;
};

/* -----------4.1------------ */

var mainPin = map.querySelector('.map__pin--main');

var adForm = document.querySelector('.ad-form');
var formElement = adForm.querySelectorAll('.ad-form__element');

var addressField = document.querySelector('#address');

var Y_ROOF = 130;
var Y_FLOOR = 630;

var closeEscHandler = function (evt) {
  if (evt.keyCode === ESC) {
    closePopup();
  }
};

var closeEnterHandler = function (evt) {
  if (evt.keyCode === ENTER) {
    closePopup();
  }
};

var closePopup = function () {
  var popup = map.querySelector('.map__card');
  var popupClose = popup.querySelector('.popup__close');

  map.removeChild(popup);
  document.removeEventListener('keydown', closeEscHandler);
  popupClose.removeEventListener('click', closePopup);
  popupClose.removeEventListener('keydown', closeEnterHandler);
};

// var mainPinX = Math.round(mainPin.offsetWidth / 2);
// var mainPinY = Math.round(mainPin.offsetHeight);

var getAddress = function (x, y) {
  addressField.value = x + ', ' + y;
  return addressField.value;
};

var mainPinHandler = function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
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

    if (startCoords.y >= Y_ROOF && startCoords.y <= Y_FLOOR) {
      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
    }

    getAddress(startCoords.x, startCoords.y);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    renderPins(adArray);
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    for (var i = 0; i < formElement.length; i++) {
      formElement[i].removeAttribute('disabled');
    }

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};

mainPin.addEventListener('mousedown', mainPinHandler);

var showCard = function (parentElement, obj) {
  var card = parentElement.querySelector('.map__card');
  if (card) {
    closePopup();
  }

  var mapFilters = map.querySelector('.map__filters-container');
  var mapAd = renderMapCard(obj);

  parentElement.insertBefore(mapAd, mapFilters);
};

/* ------------- 4.2 ------------ */

var synchronizeFields = function (element1, element2, values1, values2, callback) {
  var index = values1.indexOf(element1.value);
  callback(element2, values2[index]);
};

var synch = function (element, value) {
  element.value = value;
};

var synchWithMin = function (element, value) {
  element.min = value;
  element.value = value;
};

var onSynchTypes = function () {
  synchronizeFields(type, price, valueOfType, valueOfPrice, synchWithMin);
};

var onSynchTime = function (e) {
  var syncField = e.target === timeIn ? timeOut : timeIn;
  synchronizeFields(e.target, syncField, valueOfTimeIn, valueOfTimeOut, synch);
};

var onSynchRooms = function () {
  var value = (rooms.value === '100') ? '0' : rooms.value;
  for (var i = 0; i < capacity.children.length; i++) {
    if (capacity.children[i].value > value) {
      capacity.children[i].style.display = 'none';
    } else {
      capacity.children[i].style.display = 'initial';
    }

    if (capacity.children[i].value === '0') {
      capacity.children[i].style.display = (value === '0') ? 'initial' : 'none';
      capacity.selectedIndex = (value === '0') ? 3 : 2;
    }
  }
};

type.addEventListener('change', onSynchTypes);
rooms.addEventListener('change', onSynchRooms);
timeIn.addEventListener('change', onSynchTime);
timeOut.addEventListener('change', onSynchTime);
