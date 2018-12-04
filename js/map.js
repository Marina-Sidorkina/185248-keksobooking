'use strict';

(function () {
  var mapBlock = document.querySelector('.map');
  var mapPinTemplate = document.querySelector('#pin')
    .content.querySelector('.map__pin');
  var mainMapPin = document.querySelector('.map__pin--main');
  var mapPinsBlock = document.querySelector('.map__pins');
  var newAdAddressField = document.querySelector('#address');

  var mainMapPinParams = {
    INITIAL_X: parseInt(mainMapPin.style.left, 10) + mainMapPin.getBoundingClientRect().width / 2,
    INITIAL_Y: parseInt(mainMapPin.style.top, 10) + mainMapPin.getBoundingClientRect().height / 2
  };

  var similarMapPinParams = {
    WIDTH: 50,
    HEIGHT: 70
  };

  var resetMapBlock = function () {
    var element = mapBlock.querySelector('.map__card');
    if (element) {
      mapBlock.removeChild(element);
      resetMapBlock();
    }
  };

  var resetMapPinsBlock = function () {
    var element = mapPinsBlock.querySelector('.map__pin--similar');
    if (element) {
      mapPinsBlock.removeChild(element);
      resetMapPinsBlock();
    }
  };

  var renderMapPin = function (advertObject) {
    var pin = mapPinTemplate.cloneNode(true);
    var pinImage = pin.querySelector('img');
    pin.classList.add('map__pin--similar');
    pin.style.left = (advertObject.location.x - similarMapPinParams.WIDTH / 2) + 'px';
    pin.style.top = (advertObject.location.y - similarMapPinParams.HEIGHT) + 'px';
    pinImage.src = advertObject.author.avatar;
    pinImage.alt = advertObject.offer.title;
    pin.addEventListener('click', function () {
      resetMapBlock();
      mapBlock.insertBefore(window.renderMapCard(advertObject), mapBlock.children[1]);
    });
    return pin;
  };

  var renderMapPinsSet = function () {
    var fragment = document.createDocumentFragment();
    var array = window.createAdvertObjectsArray();
    array.forEach(function (item) {
      fragment.appendChild(renderMapPin(item));
    });
    return fragment;
  };

  var getMainMapPinPointerX = function () {
    return parseInt(mainMapPin.style.left, 10)
      + parseInt(window.getComputedStyle(document.querySelector('.map__pin--main'), ':after').getPropertyValue('left'), 10)
      + parseInt(window.getComputedStyle(document.querySelector('.map__pin--main'), ':after').getPropertyValue('width'), 10) / 2;
  };

  var getMainMapPinPointerY = function () {
    return parseInt(mainMapPin.style.top, 10)
      + parseInt(window.getComputedStyle(document.querySelector('.map__pin--main'), ':after').getPropertyValue('top'), 10)
      + parseInt(window.getComputedStyle(document.querySelector('.map__pin--main'), ':after').getPropertyValue('height'), 10);
  };

  var setAddressFieldValue = function (x, y) {
    newAdAddressField.value = x + ', ' + y;
  };

  var onMainMapPinMouseup = function () {
    mapBlock.classList.remove('map--faded');
    window.validation.enableNewAdForm();
    window.setMapFiltersFormAbility(false);
    setAddressFieldValue(getMainMapPinPointerX(), getMainMapPinPointerY());
    mapPinsBlock.appendChild(renderMapPinsSet());
    mainMapPin.removeEventListener('mouseup', onMainMapPinMouseup);
  };

  var onFormSubmitAndReset = function () {
    mapBlock.classList.add('map--faded');
    window.validation.disableNewAdForm();
    resetMapPinsBlock();
    resetMapBlock();
    window.setMapFiltersFormAbility(true);
    setAddressFieldValue(mainMapPinParams.INITIAL_X, mainMapPinParams.INITIAL_Y);
    mainMapPin.addEventListener('mouseup', onMainMapPinMouseup);
  };

  mainMapPin.addEventListener('mouseup', onMainMapPinMouseup);
  setAddressFieldValue(mainMapPinParams.INITIAL_X, mainMapPinParams.INITIAL_Y);

  window.map = {
    resetMapBlock: resetMapBlock,
    onFormSubmitAndReset: onFormSubmitAndReset
  };
})();
