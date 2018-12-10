'use strict';

(function () {
  var pinsAmount = 5;
  var similarMapPinParams = {
    WIDTH: 50,
    HEIGHT: 70
  };
  var mapBlock = document.querySelector('.map');
  var mapPinsBlock = document.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('#pin')
    .content.querySelector('.map__pin');

  var resetMapBlock = function () {
    var element = mapBlock.querySelector('.map__card');
    if (element) {
      mapBlock.removeChild(element);
      getAndResetActivePin();
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
      document.addEventListener('keydown', onCardEscape);
      pin.classList.add('map__pin--active');
    });
    return pin;
  };

  var renderMapPinsSet = function (array) {
    var fragment = document.createDocumentFragment();
    var count = 0;
    for (var i = 0; count < pinsAmount; i++) {
      if (array[i].offer) {
        fragment.appendChild(renderMapPin(array[i]));
        count += 1;
      }
    }
    mapPinsBlock.appendChild(fragment);
  };

  var enablePage = function () {
    mapBlock.classList.remove('map--faded');
    window.backend.load(renderMapPinsSet, window.backend.onLoadAndSendDataError);
  };

  var getAndResetActivePin = function () {
    var element = document.querySelector('.map__pin--active');
    element.classList.remove('map__pin--active');
  };

  var onCardEscape = function (evt) {
    if (window.utils.onEscapeKeydown(evt.keyCode)) {
      resetMapBlock();
      document.removeEventListener('keydown', onCardEscape);
    }
  };

  var onFormSubmitAndReset = function () {
    mapBlock.classList.add('map--faded');
    document.querySelector('#price').placeholder = 5000;
    window.validation.disableNewAdForm();
    resetMapPinsBlock();
    resetMapBlock();
    window.setMapFiltersFormAbility(true);
    window.resetMainPin();
  };

  window.map = {
    resetBlock: resetMapBlock,
    onFormSubmitAndReset: onFormSubmitAndReset,
    enablePage: enablePage,
    onCardEscape: onCardEscape
  };
})();
