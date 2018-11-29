'use strict';

var CARD_DESIGNATION = 'map__card';
var PIN_DESIGNATION = 'map__pin--similar';
var mapBlock = document.querySelector('.map');
var mapPinsBlock = document.querySelector('.map__pins');
var mainMapPin = mapBlock.querySelector('.map__pin--main');
var mapPinTemplate = document.querySelector('#pin')
  .content.querySelector('.map__pin');
var mapCardTemplate = document.querySelector('#card')
  .content.querySelector('.map__card');
var newAdvertForm = document.querySelector('.ad-form');
var newAdvertAddressField = newAdvertForm.querySelector('#address');
var newAdvertFieldsets = newAdvertForm.querySelectorAll('fieldset');
var newAdvertSubmitButton = newAdvertForm.querySelector('.ad-form__submit');
var newAdvertResetButton = newAdvertForm.querySelector('.ad-form__reset');
var mapFiltersForm = document.querySelector('.map__filters');
var mapFilersSelects = mapFiltersForm.querySelectorAll('select');
var mapFiltersFieldset = mapFiltersForm.querySelector('fieldset');

var mainMapPinParams = {
  INITIAL_X: parseInt(mainMapPin.style.left, 10) + mainMapPin.getBoundingClientRect().width / 2,
  INITIAL_Y: parseInt(mainMapPin.style.top, 10) + mainMapPin.getBoundingClientRect().height / 2
};

var advertParams = {
  TITLE_VALUES: [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ],
  TYPE_VALUES: [
    'palace',
    'flat',
    'house',
    'bungalo'
  ],
  TIME_VALUES: [
    '12:00',
    '13:00',
    '14:00'
  ],
  FEATURE_VALUES: [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ],
  PHOTO_LINK_VALUES: [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ],
  priceRangeValues: {
    MIN: 1000,
    MAX: 1000000
  },
  roomsAmountValues: {
    MIN: 1,
    MAX: 5
  },
  locationXValues: {
    MIN: 0,
    MAX: mapBlock.getBoundingClientRect().width
  },
  locationYValues: {
    MIN: 130,
    MAX: 630
  },
  guestsNumberValues: {
    MIN: 1,
    MAX: 10
  }
};

var accommodationTypes = {
  PALACE: 'Дворец',
  FLAT: 'Квартира',
  HOUSE: 'Дом',
  BUNGALO: 'Бунгало'
};

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getRandomArrayElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getDeclension = function (number, titles) {
  var cases = [2, 0, 1, 1, 1, 2];
  return titles[(number % 100 > 4 && number % 100 < 20) ?
    2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};

var createFeaturesArray = function () {
  var array = [];
  for (var i = 0; i < getRandomNumber(getRandomNumber(1, advertParams.FEATURE_VALUES.length), advertParams.FEATURE_VALUES.length); i++) {
    array[i] = getRandomArrayElement(advertParams.FEATURE_VALUES);
  }
  return array.join(', ');
};

var shuffleArray = function (array) {
  var result = array.slice();
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
};

var resetBlock = function (designationValue, block) {
  var element = block.querySelector('' + '.' + designationValue + '');
  if (element) {
    block.removeChild(element);
    resetBlock(designationValue, block);
  }
};

var createAdvertObject = function (avatarIndex, titleValue) {
  var coordinateX = getRandomNumber(advertParams.locationXValues.MIN, advertParams.locationXValues.MAX + 1);
  var coordinateY = getRandomNumber(advertParams.locationYValues.MIN, advertParams.locationYValues.MAX + 1);
  return {
    author: {
      avatar: 'img/avatars/user0' + avatarIndex + '.png',
    },
    offer: {
      title: titleValue,
      address: '' + coordinateX + ', ' + coordinateY + '',
      price: getRandomNumber(advertParams.priceRangeValues.MIN, advertParams.priceRangeValues.MAX + 1),
      type: getRandomArrayElement(advertParams.TYPE_VALUES),
      rooms: getRandomNumber(advertParams.roomsAmountValues.MIN, advertParams.roomsAmountValues.MAX + 1),
      guests: getRandomNumber(advertParams.guestsNumberValues.MIN, advertParams.guestsNumberValues.MAX + 1),
      checkin: getRandomArrayElement(advertParams.TIME_VALUES),
      checkout: getRandomArrayElement(advertParams.TIME_VALUES),
      features: createFeaturesArray(),
      description: '',
      photos: shuffleArray(advertParams.PHOTO_LINK_VALUES)
    },
    location: {
      x: coordinateX,
      y: coordinateY
    }
  };
};

var createAdvertObjectsArray = function () {
  var array = [];
  for (var i = 0; i < advertParams.TITLE_VALUES.length; i++) {
    array[i] = createAdvertObject(i + 1, advertParams.TITLE_VALUES[i]);
  }
  return array;
};

var renderMapPin = function (advertObject) {
  var pin = mapPinTemplate.cloneNode(true);
  var pinImage = pin.querySelector('img');
  pin.classList.add('map__pin--similar');
  pin.style.left = (advertObject.location.x - pin.getBoundingClientRect().width / 2) + 'px';
  pin.style.top = (advertObject.location.y - pin.getBoundingClientRect().height) + 'px';
  pinImage.src = advertObject.author.avatar;
  pinImage.alt = advertObject.offer.title;
  pin.addEventListener('click', function () {
    resetBlock(CARD_DESIGNATION, mapBlock);
    mapBlock.insertBefore(renderMapCard(advertObject), mapBlock.children[1]);
  });
  return pin;
};

var renderMapPinsSet = function () {
  var fragment = document.createDocumentFragment();
  var array = createAdvertObjectsArray();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(renderMapPin(array[i]));
  }
  return fragment;
};

var renderPhotosSet = function (object) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < object.offer.photos.length; i++) {
    var photo = mapCardTemplate.querySelector('.popup__photo').cloneNode(true);
    photo.src = object.offer.photos[i];
    fragment.appendChild(photo);
  }
  return fragment;
};

var renderMapCard = function (advertObject) {
  var fragment = document.createDocumentFragment();
  var card = mapCardTemplate.cloneNode(true);
  var photosBlock = card.querySelector('.popup__photos');
  card.querySelector('.popup__title').textContent = advertObject.offer.title;
  card.querySelector('.popup__text--address').textContent = advertObject.offer.address;
  card.querySelector('.popup__text--price').textContent = advertObject.offer.price + '₽/ночь';
  card.querySelector('.popup__type').textContent = accommodationTypes[advertObject.offer.type.toUpperCase()];
  card.querySelector('.popup__text--capacity').textContent = advertObject.offer.rooms
  + ' ' + getDeclension(advertObject.offer.rooms, ['комната', 'комнаты', 'комнат'])
  + ' для ' + advertObject.offer.guests + ' ' + getDeclension(advertObject.offer.guests, ['гостя', 'гостей', 'гостей']);
  card.querySelector('.popup__text--time').textContent = 'Заезд после '
  + advertObject.offer.checkin + ', '
  + 'выезд до ' + advertObject.offer.checkout;
  card.querySelector('.popup__features').textContent = advertObject.offer.features;
  card.querySelector('.popup__description').textContent = advertObject.offer.description;
  photosBlock.innerHTML = '';
  photosBlock.appendChild(renderPhotosSet(advertObject));
  card.querySelector('.popup__avatar').src = advertObject.author.avatar;
  card.querySelector('.popup__close').addEventListener('click', function () {
    resetBlock(CARD_DESIGNATION, mapBlock);
  });
  return fragment.appendChild(card);
};

var setItemsAbility = function (array, disabilityValue) {
  array.forEach(function (item) {
    item.disabled = disabilityValue;
  });
};

var setNewAdvertFormAbility = function (disabilityValue) {
  setItemsAbility(newAdvertFieldsets, disabilityValue);
  newAdvertSubmitButton.disabled = disabilityValue;
  newAdvertResetButton.disabled = disabilityValue;
};

var setMapFiltersFormAbility = function (disabilityValue) {
  setItemsAbility(mapFilersSelects, disabilityValue);
  mapFiltersFieldset.disabled = disabilityValue;
};

var setAddressFieldValue = function (x, y) {
  newAdvertAddressField.value = x + ', ' + y;
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

var onMainMapPinMouseup = function () {
  mapBlock.classList.remove('map--faded');
  newAdvertForm.classList.remove('ad-form--disabled');
  setNewAdvertFormAbility(false);
  setMapFiltersFormAbility(false);
  setAddressFieldValue(getMainMapPinPointerX(), getMainMapPinPointerY());
  resetBlock(PIN_DESIGNATION, mapPinsBlock);
  resetBlock(CARD_DESIGNATION, mapBlock);
  mapPinsBlock.appendChild(renderMapPinsSet());
};

setAddressFieldValue(mainMapPinParams.INITIAL_X, mainMapPinParams.INITIAL_Y);
setNewAdvertFormAbility(true);
setMapFiltersFormAbility(true);
mainMapPin.addEventListener('mouseup', onMainMapPinMouseup);
