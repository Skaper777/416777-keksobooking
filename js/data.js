'use strict';

(function () {
  window.data = {
    ENTER: 13,
    ESC: 27,

    titles: ['Большая уютная квартира',
      'Маленькая неуютная квартира',
      'Огромный прекрасный дворец',
      'Маленький ужасный дворец',
      'Красивый гостевой домик',
      'Некрасивый негостеприимный домик',
      'Уютное бунгало далеко от моря',
      'Неуютное бунгало по колено в воде'],

    type: document.querySelector('#type'),
    valueOfType: ['flat', 'bungalo', 'house', 'palace'],

    price: document.querySelector('#price'),
    valueOfPrice: ['1000', '0', '5000', '10000'],

    rooms: document.querySelector('select[name="rooms"]'),

    capacity: document.querySelector('select[name="capacity"]'),

    timeIn: document.querySelector('#timein'),
    valueOfTimeIn: ['12:00', '13:00', '14:00'],

    timeOut: document.querySelector('#timeout'),
    valueOfTimeOut: ['12:00', '13:00', '14:00'],

    typesLocal: {
      'Flat': 'Квартира',
      'House': 'Дом',
      'Bungalo': 'Бунгало',
      'Palace': 'Дворец'
    },
    features: ['wifi',
      'dishwasher',
      'parking',
      'washer',
      'elevator',
      'conditioner'],
    photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
    address: [window.instruments.getRandomValue(300, 900), window.instruments.getRandomValue(130, 630)],
    adArray: []
  };

  var createAdsArray = function (number) {
    for (var i = 0; i < number; i++) {
      window.data.adArray[i] = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },

        offer: {
          title: window.data.titles[i],
          address: window.data.address.toString(),
          price: window.instruments.getRandomValue(1000, 1000000),
          type: window.instruments.getRandomMassiveElement(window.data.valueOfType),
          rooms: window.instruments.getRandomValue(1, 5),
          guests: window.instruments.getRandomValue(1, 100),
          checkin: window.instruments.getRandomMassiveElement(window.data.valueOfTimeIn),
          checkout: window.instruments.getRandomMassiveElement(window.data.valueOfTimeOut),
          features: window.instruments.getRandomLength(window.data.features),
          description: '',
          photos: window.instruments.getShuffleElements(window.data.photos)
        },

        location: {
          x: window.instruments.getRandomValue(300, 900),
          y: window.instruments.getRandomValue(130, 630)
        }
      };
    }

    return window.data.adArray;
  };

  createAdsArray(8);
})();
