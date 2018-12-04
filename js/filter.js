'use strict';

(function () {
  var mapFiltersForm = document.querySelector('.map__filters');
  var mapFilersSelects = mapFiltersForm.querySelectorAll('select');
  var mapFiltersFieldset = mapFiltersForm.querySelector('fieldset');

  var setMapFiltersFormAbility = function (disabilityValue) {
    window.utils.setItemsAbility(mapFilersSelects, disabilityValue);
    mapFiltersFieldset.disabled = disabilityValue;
  };

  setMapFiltersFormAbility(true);

  window.setMapFiltersFormAbility = setMapFiltersFormAbility;
})();
