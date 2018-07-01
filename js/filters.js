'use strict';

(function () {
  var MIDDLE_MIN_PRICE = 10000;
  var MIDDLE_MAX_PRICE = 50000;
  var ANY_VALUE = 'any';

  var mapFilters = document.querySelector('.map__filters');
  var houseFeatures = mapFilters.querySelectorAll('.map__checkbox');

  var houseType = mapFilters.querySelector('#housing-type');
  var housePrice = mapFilters.querySelector('#housing-price');
  var houseRooms = mapFilters.querySelector('#housing-rooms');
  var houseGuests = mapFilters.querySelector('#housing-guests');

  var houseTypeFilter = function (obj) {
    return obj.offer.type === houseType.value || houseType.value === ANY_VALUE;
  };

  var housePriceFilter = function (obj) {
    switch (housePrice[housePrice.selectedIndex].value) {
      case 'low':
        return obj.offer.price <= MIDDLE_MIN_PRICE;
      case 'middle':
        return obj.offer.price >= MIDDLE_MIN_PRICE && obj.offer.price <= MIDDLE_MAX_PRICE;
      case 'high':
        return obj.offer.price >= MIDDLE_MAX_PRICE;
      default:
        return obj;
    }
  };

  var houseRoomsFilter = function (obj) {
    return obj.offer.rooms === parseInt(houseRooms[houseRooms.selectedIndex].value, 10) || houseRooms.value === ANY_VALUE;
  };

  var houseGuestsFilter = function (obj) {
    return obj.offer.guests === parseInt(houseGuests[houseGuests.selectedIndex].value, 10) || houseGuests.value === ANY_VALUE;
  };

  var houseFeaturesFilter = function (obj) {
    for (var i = 0; i < houseFeatures.length; i++) {
      if (houseFeatures[i].checked && obj.offer.features.indexOf(houseFeatures[i].value) < 0) {
        return false;
      }
    }

    return true;
  };

  var updatePins = function () {
    if (document.querySelector('.map__card')) {
      window.ads.closePopup();
    }
    var slicedData = window.data.slice();
    var filteredData = slicedData.filter(houseTypeFilter)
                                 .filter(housePriceFilter)
                                 .filter(houseRoomsFilter)
                                 .filter(houseGuestsFilter)
                                 .filter(houseFeaturesFilter);
    window.mapPins.removePins();
    window.mapPins.renderPins(filteredData);
  };

  mapFilters.addEventListener('change', window.debounce(updatePins));
})();
