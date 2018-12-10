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

  var addChild = function (element) {
    document.querySelector('main').appendChild(element);
  };

  var deleteChild = function (element) {
    document.querySelector('main').removeChild(element);
  };

  window.utils = {
    onEscapeKeydown: onEscapeKeydown,
    setItemsAbility: setItemsAbility,
    addChild: addChild,
    deleteChild: deleteChild
  };
})();
