'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var getRandomValue = function (min, max) {
  return Math.round((Math.random() * (max - min)) + min);
};

var getRandomMassiveElement = function (arr) {
  return arr[getRandomValue(0, arr.length - 1)];
};

var getRandomLength = function (arr) {
  arr.length = getRandomValue(0, arr.length);
  return arr;
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

var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var types = ['Palace', 'Flat', 'House', 'Bungalo'];
var typesLocal = {
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало',
  'palace': 'Дворец'
};
var times = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var address = [getRandomValue(300, 900), getRandomValue(130, 630)]
var adArray = [];

var createAdsArray = function(number) {
  for (var i = 0; i < number; i++) {
    adArray[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },

      offer: {
        title: titles[i],
        address: address.toString(),
        price: getRandomValue(1000, 1000000),
        type: getRandomMassiveElement(types),
        rooms: getRandomValue(1, 5),
        guests: getRandomValue(1, 100),
        checkin: getRandomMassiveElement(times),
        checkout: getRandomMassiveElement(times),
        features: getRandomLength(features),
        description: '',
        photos: getShuffleElements(photos)
      },

      location: {
        x: getRandomValue(300, 900),
        y: getRandomValue(130, 630)
      }
    }
  }

  return adArray[i];
}

createAdsArray(8);

//---------------2---------------//

var renderMapPin = function (obj) {
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

  return btn;
};

var pinsContainer = map.querySelector('.map__pins');

var renderPins = function (arr) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderMapPin(arr[i]));
  }

  pinsContainer.appendChild(fragment);
}

renderPins(adArray);

//-------------3-------------//

var renderMapCard = function (obj) {
  var mapCardTemplate = document.querySelector('template').content;
  var mapCard = mapCardTemplate.cloneNode(true);

  mapCard.querySelector('.popup__title').textContent = obj.offer.title;
  mapCard.querySelector('.popup__text--address').textContent = obj.offer.address;
  mapCard.querySelector('.popup__text--price').textContent = obj.offer.price + '₽/ночь';
  mapCard.querySelector('.popup__type').textContent = typesLocal[obj.offer.type];
  mapCard.querySelector('.popup__text--capacity').textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
  mapCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;
  mapCard.querySelector('.popup__description').textContent = obj.offer.description;
  mapCard.querySelector('.popup__avatar').src = obj.author.avatar;

  for (var j = 0; j < obj.offer.photos.length; j++) {
    mapCard.querySelector('.popup__photos').querySelector('.popup__photo').src = obj.offer.photos[j];
  };

  for (var i = 0; i < obj.offer.features.length; i++) {
    mapCard.querySelector('.popup__features').querySelector('li').className = '.popup__feature--' + obj.offer.features[i];
  };

  return mapCard;
};

var mapFilters = map.querySelector('.map__filters-container');
var mapAd = renderMapCard(adArray[0]);
map.insertBefore(mapAd, mapFilters);
