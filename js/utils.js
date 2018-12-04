'use strict';

(function () {
  var ESC = 27;

  var onEscapeKeydown = function (keyCode) {
    return (keyCode === ESC);
  };

  var setItemsAbility = function (array, disabilityValue) {
    array.forEach(function (item) {
      item.disabled = disabilityValue;
    });
  };

  window.utils = {
    onEscapeKeydown: onEscapeKeydown,
    setItemsAbility: setItemsAbility
  };
})();
