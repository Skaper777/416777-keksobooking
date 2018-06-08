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
  arr.length = getRandomValue(1, arr.length);
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
var times = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var adress = [getRandomValue(300, 900), getRandomValue(130, 630)]
var adArray = [];

var createAdsArray = function(number) {
  for (var i = 0; i < number; i++) {
    adArray[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },

      offer: {
        title: titles[i],
        address: adress.toString(),
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
var fragment = document.createDocumentFragment();

var renderPins = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderMapPin(arr[i]));
  }

  pinsContainer.appendChild(fragment);
}

renderPins(adArray);
