'use strict';

(function () {
  var ESC = 27;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var DROP_AREA_EVENTS = ['dragenter', 'dragover', 'dragleave', 'drop'];

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

  var preventDefaults = function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
  };

  var setEventPrevent = function (dropArea) {
    DROP_AREA_EVENTS.forEach(function (event) {
      dropArea.addEventListener(event, preventDefaults, false);
    });
  };

  var highlightDropZone = function (evt) {
    evt.target.classList.add('highlight');
  };

  var unhighlightDropZone = function (evt) {
    evt.target.classList.remove('highlight');
  };

  var setHighlightState = function (dropZone) {
    dropZone.addEventListener(DROP_AREA_EVENTS[0], highlightDropZone, false);
    dropZone.addEventListener(DROP_AREA_EVENTS[1], highlightDropZone, false);
  };

  var setUnhighlightState = function (dropZone) {
    dropZone.addEventListener(DROP_AREA_EVENTS[2], unhighlightDropZone, false);
    dropZone.addEventListener(DROP_AREA_EVENTS[3], unhighlightDropZone, false);
  };


  window.utils = {
    onEscapeKeydown: onEscapeKeydown,
    setItemsAbility: setItemsAbility,
    addChild: addChild,
    deleteChild: deleteChild,
    checkFileType: checkFileType,
    setEventPrevent: setEventPrevent,
    setHighlightState: setHighlightState,
    setUnhighlightState: setUnhighlightState
  };
})();
