'use strict';

(function () {
  window.ads = {
    showCard: function (parentElement, obj) {
      var card = parentElement.querySelector('.map__card');
      if (card) {
        closePopup();
      }

      var mapFilters = window.map.map.querySelector('.map__filters-container');
      var mapAd = renderMapCard(obj);

      parentElement.insertBefore(mapAd, mapFilters);
    }
  };

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
    mapCard.querySelector('.popup__type').textContent = window.data.typesLocal[obj.offer.type];
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

  var closeEscHandler = function (evt) {
    if (evt.keyCode === window.data.ESC) {
      closePopup();
    }
  };

  var closeEnterHandler = function (evt) {
    if (evt.keyCode === window.data.ENTER) {
      closePopup();
    }
  };

  var closePopup = function () {
    var popup = window.map.map.querySelector('.map__card');
    var popupClose = popup.querySelector('.popup__close');

    window.map.map.map.removeChild(popup);
    document.removeEventListener('keydown', closeEscHandler);
    popupClose.removeEventListener('click', closePopup);
    popupClose.removeEventListener('keydown', closeEnterHandler);
  };
})();
