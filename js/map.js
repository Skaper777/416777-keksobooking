'use strict';

var map = document.querySelector('.map');
map.classList.remove('.map--faded');

var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var types = ['Palace', 'Flat', 'House', 'Bungalo'];
var times = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var adArray = [];

var getRandomValue = function (min, max) {
  return Math.round((Math.random() * (max - min)) + min);
};

var getRandomMassiveElement = function (arr) {
  return arr[getRandomValue(0, arr.length - 1)];
};

var getRandomLength = function (arr) {
  arr.length = getRandomValue(1, 6);
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

var createAdsArray = function(number) {
  for (var i = 0; i < number; i++) {
    adArray[i] = {
      author: {
        avatar: 'img/avatars/user 0' + i + '.png'
      },

      offer: {
        title: titles[i],
        address: toString(location.x, location.y),
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