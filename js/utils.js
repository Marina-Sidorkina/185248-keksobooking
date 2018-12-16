'use strict';

(function () {
  var ESC = 27;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

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

  var checkFileType = function (file) {
    var fileName = file.name.toLowerCase();
    return FILE_TYPES.some(function (ending) {
      return fileName.endsWith(ending);
    });
  };

  window.utils = {
    onEscapeKeydown: onEscapeKeydown,
    setItemsAbility: setItemsAbility,
    addChild: addChild,
    deleteChild: deleteChild,
    checkFileType: checkFileType
  };
})();
