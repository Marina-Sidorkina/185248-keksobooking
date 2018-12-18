'use strict';

(function () {
  var mapFiltersBlock = document.querySelector('.map__filters-container');
  var mapFilersSelects = mapFiltersBlock.querySelectorAll('select');
  var mapFiltersFieldset = mapFiltersBlock.querySelector('fieldset');
  var housingFeaturesFieldset = document.querySelector('#housing-features');
  var housingTypeSelect = document.querySelector('#housing-type');
  var housingRoomsSelect = document.querySelector('#housing-rooms');
  var housingGuestsSelect = document.querySelector('#housing-guests');
  var housingPriceSelect = document.querySelector('#housing-price');
  var priceCheckVariants = {
    low: function (item) {
      return item.offer.price < 10000;
    },
    middle: function (item) {
      return item.offer.price >= 10000 && item.offer.price <= 50000;
    },
    high: function (item) {
      return item.offer.price > 50000;
    }
  };

  var setMapFiltersFormAbility = function (disabilityValue) {
    window.utils.setItemsAbility(mapFilersSelects, disabilityValue);
    mapFiltersFieldset.disabled = disabilityValue;
  };

  var checkHousingFeatures = function (item) {
    var check = true;
    var filters = housingFeaturesFieldset.querySelectorAll('input:checked');
    if (filters.length) {
      var array = Array.from(filters);
      check = array.every(function (filter) {
        return item.offer.features.some(function (feature) {
          return feature === filter.value;
        });
      });
    }
    return check;
  };

  var checkRoomsAndGuestsValue = function (select, field, item) {
    var check = true;
    if (select.value !== 'any') {
      check = item.offer[field] === parseInt(select.value, 10);
    }
    return check;
  };

  var checkType = function (item) {
    var check = true;
    if (housingTypeSelect.value !== 'any') {
      check = item.offer.type === housingTypeSelect.value;
    }
    return check;
  };

  var checkPrice = function (item) {
    var check = true;
    if (housingPriceSelect.value !== 'any') {
      check = priceCheckVariants[housingPriceSelect.value](item);
    }
    return check;
  };

  var checkOffer = function (item) {
    return (checkHousingFeatures(item) && checkPrice(item)
      && checkType(item) && checkRoomsAndGuestsValue(housingRoomsSelect, 'rooms', item) && checkRoomsAndGuestsValue(housingGuestsSelect, 'guests', item));
  };

  setMapFiltersFormAbility(true);

  window.filter = {
    setMapFormAbility: setMapFiltersFormAbility,
    checkOffer: checkOffer
  };
})();
